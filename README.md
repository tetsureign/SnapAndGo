# Snap&Go - Đồ án

## Cài đặt môi trường

[Làm theo hướng dẫn ở đây](https://reactnative.dev/docs/environment-setup)

## Chạy ứng dụng

### **Lấy repo từ GitHub**

```bash
git clone https://github.com/shortthu/SnapAndGo.git
cd SnapAndGo
```

### **Cài đặt các node_modules**

```bash
npm i
```

### **Chạy trên Android**

_Kết nối điện thoại ở chế độ debug trước nếu muốn dùng điện thoại thay cho emulator_

```bash
npm run android
```

## Các command khác

### Bắt đầu server Metro để chạy file js sau khi build app và app đã chạy trên máy

_(Trong trường hợp lỡ tắt cửa sổ Metro hay làm sao đó mà nó mất tiêu)_

```bash
npm start
```

### Sửa lỗi Metro không thấy thiết bị sau khi rút USB, hoặc vì lý do nào đó bị disconnect

Nhớ kết nối với điện thoại trước rồi mới làm nhe =))

```bash
adb reverse tcp:8081 tcp:8081
```
