# fienmee

## prerequisite
* node 20
* pnpm
* android studio
* Xcode (macbook 사용자)

## Getting Started
```
# package install
pnpm install
cd apps/app/ios
pod install

# server
cd apps/server
pnpm dev

# web
cd apps/web
pnpm dev -H 192.168.0.5 # 본인 ip로 변경

# app
cd apps/app
pnpm start
# 이후 ios/android 선택
```

## application build
android build 방법
```shell
cd apps/app/android
./gradlew bundleRelease
# apps/app/android/app/build/outputs/apk 경로에 .apk 파일 생성됨
```