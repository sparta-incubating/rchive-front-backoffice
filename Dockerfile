# Dockerfile

# Node.js 이미지를 사용하여 빌드합니다.
FROM node:18 as build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 앱 코드 복사 및 빌드
COPY . .
RUN npm run build

# 배포용 Node.js 이미지를 사용합니다.
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY --from=build /app ./

# 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]