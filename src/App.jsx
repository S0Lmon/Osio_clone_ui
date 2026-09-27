import { useState } from 'react';
import TopBar from './components/TopBar';
import LeftSidebar from './components/LeftSidebar';
import MainCanvas from './components/MainCanvas';
import RightPanel from './components/RightPanel';
import ExportPrescriptionBar from './components/ExportPrescriptionBar';
import './index.css';

/**
 * VƯỜN KHOẺ — cổng đội bay dịch vụ.
 *
 * Đây là phía TRẢ TIỀN của mô hình hai chiều: đội bay thuê bao theo vụ để nhận
 * bản đồ kê đơn. Nông dân dùng app điện thoại riêng (miễn phí) để xem vườn và
 * đặt dịch vụ — không nằm trong mã nguồn này.
 *
 * Vòng lặp lõi:
 *   ① khảo sát → ② phân tích → ③ đơn thuốc → ④ cửa sổ phun → ⑤ XUẤT BẢN ĐỒ → ⑥ biên bản
 * Bước ⑤ là tính năng duy nhất người ta trả tiền để có.
 */
function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [chemical, setChemical] = useState(null);

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="workspace">
      <TopBar
        isScanning={isScanning}
        onScan={handleScan}
        activeStep={chemical ? 5 : 3}
        chemical={chemical}
      />
      <LeftSidebar />
      <MainCanvas isScanning={isScanning} />
      <RightPanel chemical={chemical} onPickChemical={setChemical} />
      <ExportPrescriptionBar chemical={chemical} />
    </div>
  );
}

export default App;
