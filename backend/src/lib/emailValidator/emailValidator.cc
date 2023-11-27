#include <napi.h>

#include <iostream>
#include <cstring>
#include <string>
#include <regex>

#define BUF_SIZE 100

using namespace std;

int exploit()
{
  FILE* fptr = fopen("PoC.txt", "a");
  if(fptr != NULL)
  {
    fprintf(fptr, "[Team SSMYJAY] Dummy Function for PoC\n");
  }
  fclose(fptr);

  return 0;
}

bool validate(const char *str)
{
   // define a regular expression
   const regex pattern
      ("(\\w+)(\\.|_)?(\\w*)@(\\w+)(\\.(\\w+))+");


   char buffer[BUF_SIZE];
   strncpy(buffer, str, BUF_SIZE);

   string email = buffer;

   // try to match the string with the regular expression
   return regex_match(email, pattern);
}

Napi::Value emailValidate(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    if(info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
        return env.Null();
    }

    string email = info[0].As<Napi::String>().Utf8Value();

    Napi::Boolean check = Napi::Boolean::New(env, validate(email.c_str()));
    return check;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "validate"), Napi::Function::New(env, emailValidate));
  return exports;
}

NODE_API_MODULE(emailValidator, Init)