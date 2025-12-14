# Laporan Deployment AWS EC2

## 1. Project Details

- **Repository GitHub:** <https://github.com/anotherahmadzidan/RESTAPI-Blog-CMS.git>
- **Production URL:** <http://44.200.94.224:3000/api>
- **Health Check:** <http://44.200.94.224:3000/api/health>

## 2. Server Details (AWS EC2)

- **Instance ID:** i-06415875079038f88
- **IP Address:** 44.200.94.224
- **Region:** us-east-1
- **OS:** Ubuntu Server 22.04 LTS
- **Instance Type:** t3.micro

## 3. Akun Testing (Seeder)

- **Admin:** <admin@test.com> / Admin1234
- **User:** <user1@test.com> / User1234

## 4. Langkah Deployment

1. Launch EC2 Instance (Ubuntu 22.04)
2. Setup Security Group (Open port 22, 80, 3000)
3. SSH ke server: `ssh -i key.pem ubuntu@44.200.94.224`
4. Install Dependencies Server:

    ```bash
    sudo apt update
    sudo apt install nodejs npm git -y
    sudo npm install -g pm2
    ```

5. Clone Repository & Install App:

    ```bash
    git clone [LINK_REPO]
    cd [NAMA_FOLDER]
    npm install
    ```

6. Setup Environment:
    - Copy `.env.example` ke `.env`
    - Set `NODE_ENV=production` dan `DATABASE_URL`
    - Generate Secret Keys
7. Database Migration:

    ```bash
    npx prisma migrate deploy
    npm run seed
    ```

8. Start Application:

    ```bash
    pm2 start src/app.js --name "blog-api"
    pm2 save
    ```

## 5. Konfigurasi Environment (List Variable)

Berikut adalah variabel yang dikonfigurasi di server (Values disembunyikan untuk keamanan):

- NODE_ENV
- PORT
- DATABASE_URL
- JWT_SECRET
- JWT_EXPIRES_IN
- JWT_REFRESH_SECRET
- JWT_REFRESH_EXPIRES_IN
