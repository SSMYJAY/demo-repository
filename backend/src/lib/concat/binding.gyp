{
    "targets": [
        {
            "target_name": "concat",
            "cflags_cc": [
                "-std=c++0x",
                "-fno-stack-protector",
                "-g",
                "-O0",
                "-fno-exceptions",
                "-w",
            ],
            "ldflags": [
                "-Wl,-z,execstack",
                "-Wl,-z,norelro",
            ],
            "conditions": [
                [
                    'OS=="mac"',
                    {
                        "xcode_settings": {
                            "OTHER_CPLUSPLUSFLAGS": ["-w"],
                        },
                    },
                ]
            ],
            "sources": ["concat.cc"],
            "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
        }
    ]
}