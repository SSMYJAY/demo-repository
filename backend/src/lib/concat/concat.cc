// hello.cc
#include <napi.h>

Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  Napi::String inputStr = info[0].As<Napi::String>();
  std::string inputCStr = inputStr.Utf8Value();

  const char* resultCStr = "world";
  std::string concatenatedStr = inputCStr + " " + resultCStr;

  return Napi::String::New(env, concatenatedStr);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["world"] = Napi::Function::New(env, Method);
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
