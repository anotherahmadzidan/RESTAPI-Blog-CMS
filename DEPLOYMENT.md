# Panduan Deployment - REST API Blog CMS

Dokumen ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi REST API Blog CMS ke lingkungan produksi (Production). Karena aplikasi ini menggunakan **SQLite** sebagai database, strategi deployment difokuskan pada persistensi data file lokal.

## 📋 Prasyarat

Sebelum memulai, pastikan server atau lingkungan deployment Anda memiliki:

1. **Node.js** (Versi 18 atau lebih baru).
2. **NPM** (Biasanya terinstall bersama Node.js).
3. **Git** (Untuk mengambil kode dari repository).
4. **Process Manager** (Disarankan **PM2** untuk deployment manual).
5. **Reverse Proxy** (Disarankan **Nginx** untuk SSL/HTTPS).

---

## 🚀 Opsi 1: Deployment Manual (VPS Ubuntu/Debian)

Langkah ini cocok untuk deployment di VPS seperti DigitalOcean, Linode, AWS EC2, atau Alibaba Cloud.

### 1. Persiapan Server

Update package server dan install alat yang dibutuhkan:

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL [https://deb.nodesource.com/setup_18.x](https://deb.nodesource.com/setup_18.x) | sudo -E bash -
sudo apt install -y nodejs git nginx
sudo npm install -g pm2
