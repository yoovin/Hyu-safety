# Hyu-safety
> ✏️ 한양대학교 ERICA 캠퍼스 안전팀의 도급관리를 위한 웹, 앱, 서버를 구축하였습니다.

## 📱 🖥️ 실행방법
### 공통
- (각 폴더별로) npm install
### Backend
- Mongodb가 설치되어 있어야 합니다.
- cd backend
- ts-node index.ts
### Web
- cd adminpage
- npm start or npm build
### ios
- cd ios && pod install && cd ..
- npm run ios
### android
- npm run android

## 🛠️ 사용기술 및 라이브러리
- f**rontend**
    - **Framework**: React Native
    - **Library**: React
    - **Network**: Axios
    - **State management**: AsyncStorage, Recoil
    - **Login**: Jwt
    - **Other**: Tailwindcss, toast-editor
- **Backend**
    - **Framework**: Express
    - **Database**: Mongodb, Mongoose
    - **Login**: Jsonwebtoken
    - **Deployment**: Docker
    - **Logging**: Winston
    - **Other**: Firebase, Multer, write-excel-file
