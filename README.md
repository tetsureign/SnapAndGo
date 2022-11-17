# Snap&Go - Đồ án

## Cài đặt môi trường

[Làm theo hướng dẫn ở đây](https://reactnative.dev/docs/environment-setup)

## Chạy ứng dụng

### __Lấy repo từ GitHub__

```bash
git clone https://github.com/shortthu/SnapAndGo.git
cd SnapAndGo
```

### __Cài đặt các node_modules__

```bash
npm i
```

### __Chạy trên Android__

*Kết nối điện thoại ở chế độ debug trước nếu muốn dùng điện thoại thay cho emulator*

```bash
npx react-native run-android
```

## Các command khác

### Bắt đầu server Metro để chạy file js sau khi build app và app đã chạy trên máy

*(Trong trường hợp lỡ tắt cửa sổ Metro hay làm sao đó mà nó mất tiêu)*

```bash
npx react-native start
```

### Sửa lỗi Metro không thấy thiết bị sau khi rút USB, hoặc vì lý do nào đó bị disconnect

Nhớ kết nối với điện thoại trước rồi mới làm nhe =))

```bash
adb reverse tcp:8081 tcp:8081
```
