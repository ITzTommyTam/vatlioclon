import React from 'react';
import { X } from 'lucide-react';

interface FormulaReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaReferenceModal: React.FC<FormulaReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Tóm Tắt Công Thức Chương 1: Vật Lí Nhiệt
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Hệ thống công thức trọng tâm áp dụng cho 75 câu Phần I và 13 câu Đúng - Sai Phần II
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Đóng bảng công thức"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h3 className="font-display text-sm font-bold text-slate-900">
              01. Chuyển đổi thang nhiệt độ
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Celsius sang Kelvin:</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  T(K) = t(°C) + 273
                </div>
              </li>
              <li>
                <span className="font-medium text-slate-900">Celsius sang Fahrenheit:</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  t(°F) = 1,8 · t(°C) + 32
                </div>
              </li>
              <li>
                <span className="font-medium text-slate-900">Nhiệt kế chưa chia vạch (tuyến tính):</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  t = [(l − l₀) / (l₁₀₀ − l₀)] × 100°C
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h3 className="font-display text-sm font-bold text-slate-900">
              02. Nội năng & Nguyên lí I NĐLH
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Hệ thức Nguyên lí I:</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  ΔU = A + Q
                </div>
              </li>
              <li className="text-xs leading-relaxed text-slate-600">
                • <strong>Q &gt; 0</strong>: Hệ nhận nhiệt lượng · <strong>Q &lt; 0</strong>: Hệ truyền (tỏa) nhiệt.<br />
                • <strong>A &gt; 0</strong>: Hệ nhận công · <strong>A &lt; 0</strong>: Hệ thực hiện (sinh) công.<br />
                • <strong>Công đẳng áp</strong>: <span className="font-mono">|A| = p · ΔV = F · d</span> (1 lít = 10⁻³ m³).
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h3 className="font-display text-sm font-bold text-slate-900">
              03. Nhiệt dung riêng & Cân bằng nhiệt
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Nhiệt lượng thu vào / tỏa ra khi thay đổi nhiệt độ:</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  Q = m · c · Δt = m · c · (t₂ − t₁)
                </div>
              </li>
              <li>
                <span className="font-medium text-slate-900">Phương trình cân bằng nhiệt:</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  Q_tỏa = Q_thu
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h3 className="font-display text-sm font-bold text-slate-900">
              04. Nhiệt nóng chảy riêng & Nhiệt hóa hơi riêng
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Nhiệt nóng chảy (ở nhiệt độ nóng chảy):</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  Q = λ · m &nbsp; (Đơn vị λ: J/kg)
                </div>
              </li>
              <li>
                <span className="font-medium text-slate-900">Nhiệt hóa hơi (ở nhiệt độ sôi):</span>
                <div className="mt-1 rounded bg-white px-2.5 py-1.5 font-mono text-xs text-sky-800 border border-slate-200">
                  Q = L · m &nbsp; (Đơn vị L: J/kg)
                </div>
              </li>
              <li className="text-xs text-slate-600">
                • Đổi đơn vị điện năng: <span className="font-mono">1 kWh = 3,6 · 10⁶ J</span>.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Đã hiểu, quay lại bài làm
          </button>
        </div>
      </div>
    </div>
  );
};
