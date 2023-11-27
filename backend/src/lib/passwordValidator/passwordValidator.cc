#include <napi.h>

#include <iostream>
#include <cstring>
#include <string>

#define BUF_SIZE 50

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
    char buffer[BUF_SIZE];
    strncpy(buffer, str, BUF_SIZE);
    
    string password = buffer;
    int n = password.length();
    if(n < 8) return false;
    bool hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false;
  
    for(int i = 0; i < n; i++)
    { 
        if(islower(password[i])) 
            hasLower = true; 
        else if(isupper(password[i])) 
            hasUpper = true; 
        else if(isdigit(password[i])) 
            hasDigit = true; 
        else
            hasSpecial = true;
    }

    if(hasLower && hasUpper && hasDigit && hasSpecial)
        return true;
    else
        return false;

} 

Napi::Value passwordValidator(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    if(info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
        return env.Null();
    }

    string password = info[0].As<Napi::String>().Utf8Value();

    Napi::Boolean check = Napi::Boolean::New(env, validate(password.c_str()));
    return check;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "validate"), Napi::Function::New(env, passwordValidator));
  return exports;
}

NODE_API_MODULE(passwordValidator, Init)