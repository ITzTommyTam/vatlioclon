import React from 'react';
import { DiagramType } from '../types/quiz';

interface PhysicsDiagramProps {
  type: DiagramType;
}

export const PhysicsDiagram: React.FC<PhysicsDiagramProps> = ({ type }) => {
  switch (type) {
    case 'q61_table':
      return (
        <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <table className="w-full border-collapse text-left text-sm tabular-nums">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-700">
                <th className="px-4 py-2.5 font-semibold">Chất</th>
                <th className="px-4 py-2.5 font-semibold">Nhiệt độ nóng chảy (°C)</th>
                <th className="px-4 py-2.5 font-semibold">Nhiệt độ sôi (°C)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
              <tr>
                <td className="px-4 py-2 font-medium">1</td>
                <td className="px-4 py-2 font-mono">−210</td>
                <td className="px-4 py-2 font-mono">−196</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">2</td>
                <td className="px-4 py-2 font-mono">−39</td>
                <td className="px-4 py-2 font-mono">357</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">3</td>
                <td className="px-4 py-2 font-mono">30</td>
                <td className="px-4 py-2 font-mono">2 400</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">4</td>
                <td className="px-4 py-2 font-mono">327</td>
                <td className="px-4 py-2 font-mono">1 749</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'q67_thermometer':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium text-slate-500">
            Hình minh họa: Nhiệt kế thủy ngân đặt dọc theo thước đo (cm)
          </div>
          <svg viewBox="0 0 600 175" className="w-full max-w-xl mx-auto h-auto select-none">
            {/* Labels on top */}
            <text x="112" y="24" textAnchor="middle" className="fill-slate-700 text-[12px] font-medium">
              điểm đóng băng (0°C)
            </text>
            <text x="290" y="24" textAnchor="middle" className="fill-slate-700 text-[12px] font-medium">
              nhiệt kế
            </text>
            <text x="512" y="24" textAnchor="middle" className="fill-slate-700 text-[12px] font-medium">
              điểm sôi (100°C)
            </text>

            {/* Thermometer bulb and stem */}
            <circle cx="48" cy="58" r="14" className="fill-slate-700 stroke-slate-800" strokeWidth="2" />
            <rect x="58" y="50" width="490" height="16" rx="8" className="fill-slate-100 stroke-slate-600" strokeWidth="1.8" />
            {/* Mercury column from bulb to 6.6 cm (x = 72 + 6.6 * 40 = 336) */}
            <rect x="55" y="54" width="281" height="8" rx="2" className="fill-sky-600" />

            {/* Freezing point dashed line at 1.0 cm (x = 72 + 1 * 40 = 112) */}
            <line x1="112" y1="30" x2="112" y2="95" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Mercury level dashed line at 6.6 cm (x = 72 + 6.6 * 40 = 336) */}
            <line x1="336" y1="45" x2="336" y2="95" stroke="#0284C7" strokeWidth="1.8" strokeDasharray="3 3" />
            {/* Boiling point dashed line at 11.0 cm (x = 72 + 11 * 40 = 512) */}
            <line x1="512" y1="30" x2="512" y2="95" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Ruler body */}
            <rect x="56" y="95" width="495" height="46" rx="3" className="fill-amber-50/70 stroke-slate-700" strokeWidth="1.5" />
            {Array.from({ length: 12 }).map((_, cm) => {
              const x = 72 + cm * 40;
              return (
                <g key={cm}>
                  <line x1={x} y1="95" x2={x} y2="112" stroke="#0F172A" strokeWidth="1.6" />
                  <text x={x} y="128" textAnchor="middle" className="fill-slate-800 text-[12px] font-mono">
                    {cm}
                  </text>
                  {cm < 11 &&
                    Array.from({ length: 9 }).map((__, mmIdx) => {
                      const mmX = x + (mmIdx + 1) * 4;
                      const isHalf = mmIdx + 1 === 5;
                      return (
                        <line
                          key={mmIdx}
                          x1={mmX}
                          y1="95"
                          x2={mmX}
                          y2={isHalf ? 107 : 103}
                          stroke="#475569"
                          strokeWidth="1"
                        />
                      );
                    })}
                </g>
              );
            })}
            {/* Highlight 6.6 mark */}
            <text x="336" y="158" textAnchor="middle" className="fill-sky-700 text-[13px] font-mono font-semibold">
              6,6 cm
            </text>
            <text x="150" y="158" textAnchor="middle" className="fill-slate-600 text-[12px]">
              thước cm
            </text>
          </svg>
        </div>
      );

    case 'q72_phase_triangle':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium text-slate-500">
            Sơ đồ các hình thức chuyển thể (Câu 72)
          </div>
          <svg viewBox="0 0 360 220" className="w-full max-w-sm mx-auto h-auto select-none">
            <defs>
              <marker id="arrow72" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F172A" />
              </marker>
            </defs>

            {/* Nodes */}
            <circle cx="80" cy="48" r="28" className="fill-slate-100 stroke-slate-800" strokeWidth="2" />
            <text x="80" y="53" textAnchor="middle" className="fill-slate-900 text-[14px] font-semibold">
              Rắn
            </text>

            <circle cx="80" cy="172" r="28" className="fill-slate-100 stroke-slate-800" strokeWidth="2" />
            <text x="80" y="177" textAnchor="middle" className="fill-slate-900 text-[14px] font-semibold">
              Lỏng
            </text>

            <circle cx="260" cy="110" r="28" className="fill-slate-100 stroke-slate-800" strokeWidth="2" />
            <text x="260" y="115" textAnchor="middle" className="fill-slate-900 text-[14px] font-semibold">
              Khí
            </text>

            {/* (1) Lỏng -> Rắn */}
            <line x1="80" y1="142" x2="80" y2="80" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow72)" />
            <text x="52" y="115" textAnchor="middle" className="fill-slate-800 text-[14px] font-mono font-semibold">
              (1)
            </text>

            {/* (2) Rắn -> Khí */}
            <line x1="108" y1="58" x2="230" y2="100" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow72)" />
            <text x="175" y="68" textAnchor="middle" className="fill-slate-800 text-[14px] font-mono font-semibold">
              (2)
            </text>

            {/* (3) Khí -> Lỏng */}
            <line x1="230" y1="120" x2="108" y2="162" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow72)" />
            <text x="175" y="160" textAnchor="middle" className="fill-slate-800 text-[14px] font-mono font-semibold">
              (3)
            </text>
          </svg>
        </div>
      );

    case 'q73_cooling_curve':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium text-slate-500">
            Đồ thị sự thay đổi nhiệt độ của nước theo thời gian (Câu 73)
          </div>
          <svg viewBox="0 0 420 240" className="w-full max-w-md mx-auto h-auto select-none">
            <defs>
              <marker id="axisArrow73" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="55" y1="210" x2="55" y2="18" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrow73)" />
            <line x1="40" y1="145" x2="395" y2="145" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrow73)" />

            {/* Labels on Y axis */}
            <text x="45" y="22" textAnchor="end" className="fill-slate-700 text-[12px] font-semibold">
              t(°C)
            </text>
            <text x="46" y="54" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              100
            </text>
            <text x="46" y="100" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              50
            </text>
            <text x="46" y="143" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              0
            </text>
            <text x="46" y="190" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              −50
            </text>
            <text x="385" y="164" textAnchor="end" className="fill-slate-700 text-[12px] font-semibold">
              t (Thời gian)
            </text>

            {/* Grid dashed lines */}
            <line x1="55" y1="50" x2="130" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="55" y1="97" x2="360" y2="97" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="55" y1="186" x2="360" y2="186" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

            {/* Graph polyline A -> B -> C -> D -> E */}
            <polyline
              points="55,50 130,50 220,145 305,145 350,198"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Points A, B, C, D, E */}
            <circle cx="55" cy="50" r="3.5" className="fill-sky-700" />
            <text x="64" y="43" className="fill-slate-900 text-[13px] font-semibold">
              A
            </text>

            <circle cx="130" cy="50" r="3.5" className="fill-sky-700" />
            <text x="134" y="43" className="fill-slate-900 text-[13px] font-semibold">
              B
            </text>

            <circle cx="220" cy="145" r="3.5" className="fill-sky-700" />
            <text x="216" y="136" className="fill-slate-900 text-[13px] font-semibold">
              C
            </text>

            <circle cx="305" cy="145" r="3.5" className="fill-sky-700" />
            <text x="308" y="136" className="fill-slate-900 text-[13px] font-semibold">
              D
            </text>

            <circle cx="350" cy="198" r="3.5" className="fill-sky-700" />
            <text x="358" y="202" className="fill-slate-900 text-[13px] font-semibold">
              E
            </text>
          </svg>
        </div>
      );

    case 'q74_molecular_states':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-3 text-xs font-medium text-slate-500">
            Mô hình chuyển động của phân tử ở ba thể (I), (II), (III) (Câu 74)
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {/* (I) Thể khí */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-full h-28 rounded border border-slate-300 bg-slate-50">
                <line x1="25" y1="30" x2="88" y2="52" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="88" y1="52" x2="36" y2="92" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="25" cy="30" r="8" className="fill-slate-700" />
                <circle cx="88" cy="52" r="8" className="fill-slate-700" />
                <circle cx="36" cy="92" r="8" className="fill-slate-700" />
              </svg>
              <span className="mt-1.5 font-mono text-sm font-semibold text-slate-800">(I)</span>
            </div>

            {/* (II) Thể rắn */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-full h-28 rounded border border-slate-300 bg-slate-50">
                <line x1="60" y1="26" x2="60" y2="94" stroke="#475569" strokeWidth="1.5" />
                <line x1="26" y1="60" x2="94" y2="60" stroke="#475569" strokeWidth="1.5" />
                <line x1="36" y1="36" x2="84" y2="84" stroke="#475569" strokeWidth="1.5" />
                <line x1="84" y1="36" x2="36" y2="84" stroke="#475569" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="11" className="fill-slate-700 stroke-white" strokeWidth="2" />
              </svg>
              <span className="mt-1.5 font-mono text-sm font-semibold text-slate-800">(II)</span>
            </div>

            {/* (III) Thể lỏng */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 120" className="w-full h-28 rounded border border-slate-300 bg-slate-50">
                {[
                  { x: 35, y: 35 },
                  { x: 82, y: 38 },
                  { x: 58, y: 65 },
                  { x: 32, y: 88 },
                  { x: 85, y: 88 },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <line x1={pt.x - 14} y1={pt.y} x2={pt.x + 14} y2={pt.y} stroke="#475569" strokeWidth="1.2" />
                    <line x1={pt.x} y1={pt.y - 14} x2={pt.x} y2={pt.y + 14} stroke="#475569" strokeWidth="1.2" />
                    <circle cx={pt.x} cy={pt.y} r="7.5" className="fill-slate-700" />
                  </g>
                ))}
              </svg>
              <span className="mt-1.5 font-mono text-sm font-semibold text-slate-800">(III)</span>
            </div>
          </div>
        </div>
      );

    case 'q75_melting_curve':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium text-slate-500">
            Đồ thị sự thay đổi nhiệt độ của nước theo thời gian (Câu 75)
          </div>
          <svg viewBox="0 0 420 220" className="w-full max-w-md mx-auto h-auto select-none">
            <defs>
              <marker id="axisArrow75" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="65" y1="195" x2="65" y2="20" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrow75)" />
            <line x1="45" y1="115" x2="390" y2="115" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrow75)" />

            <text x="72" y="24" className="fill-slate-700 text-[12px] font-semibold">
              Nhiệt độ (°C)
            </text>
            <text x="385" y="105" textAnchor="end" className="fill-slate-700 text-[12px] font-semibold">
              Thời gian (phút)
            </text>

            {/* Y labels */}
            <text x="55" y="59" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              10
            </text>
            <text x="55" y="112" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              0
            </text>
            <text x="55" y="175" textAnchor="end" className="fill-slate-700 text-[12px] font-mono">
              −10
            </text>

            {/* X labels: 1 at x=140, 2.5 at x=245, 3.5 at x=315 */}
            <text x="140" y="134" textAnchor="middle" className="fill-slate-700 text-[12px] font-mono">
              1
            </text>
            <text x="245" y="134" textAnchor="middle" className="fill-slate-700 text-[12px] font-mono">
              2,5
            </text>
            <text x="315" y="134" textAnchor="middle" className="fill-slate-700 text-[12px] font-mono">
              3,5
            </text>

            {/* Dashed helper lines */}
            <line x1="65" y1="55" x2="315" y2="55" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="315" y1="55" x2="315" y2="115" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Polyline: (0, -10) -> (1, 0) -> (2.5, 0) -> (3.5, 10) */}
            <polyline
              points="65,172 140,115 245,115 315,55"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="65" cy="172" r="3.5" className="fill-sky-700" />
            <circle cx="140" cy="115" r="3.5" className="fill-sky-700" />
            <circle cx="245" cy="115" r="3.5" className="fill-sky-700" />
            <circle cx="315" cy="55" r="3.5" className="fill-sky-700" />
          </svg>
        </div>
      );

    case 'p2_q5_heating_curve':
      return (
        <div className="my-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium text-slate-500">
            Đồ thị đun nóng liên tục một lượng nước đá trong bình không kín (Phần II - Câu 5)
          </div>
          <svg viewBox="0 0 440 230" className="w-full max-w-md mx-auto h-auto select-none">
            <defs>
              <marker id="axisArrowP2Q5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="55" y1="190" x2="55" y2="18" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrowP2Q5)" />
            <line x1="55" y1="190" x2="405" y2="190" stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrowP2Q5)" />

            <text x="64" y="24" className="fill-slate-700 text-[12px] font-semibold">
              t(°C)
            </text>
            <text x="405" y="212" textAnchor="end" className="fill-slate-700 text-[12px] font-semibold">
              t (Thời gian)
            </text>

            {/* Y ticks: 0, 25, 50, 75, 100 */}
            {[
              { label: '0', y: 190 },
              { label: '25', y: 158 },
              { label: '50', y: 126 },
              { label: '75', y: 94 },
              { label: '100', y: 62 },
            ].map((tick) => (
              <g key={tick.label}>
                <text x="46" y={tick.y + 4} textAnchor="end" className="fill-slate-700 text-[11px] font-mono">
                  {tick.label}
                </text>
                <line x1="52" y1={tick.y} x2="55" y2={tick.y} stroke="#334155" strokeWidth="1.5" />
              </g>
            ))}

            {/* Dashed helper lines for B and C */}
            <line x1="55" y1="62" x2="310" y2="62" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="230" y1="62" x2="230" y2="190" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="310" y1="62" x2="310" y2="190" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 4" />

            {/* Curve O -> A -> B -> C -> D */}
            <polyline
              points="55,190 120,190 230,62 310,62 365,28"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="55" cy="190" r="3.5" className="fill-sky-700" />
            <text x="50" y="208" className="fill-slate-900 text-[13px] font-semibold">
              O
            </text>

            <circle cx="120" cy="190" r="3.5" className="fill-sky-700" />
            <text x="120" y="180" textAnchor="middle" className="fill-slate-900 text-[13px] font-semibold">
              A
            </text>

            <circle cx="230" cy="62" r="3.5" className="fill-sky-700" />
            <text x="226" y="52" textAnchor="middle" className="fill-slate-900 text-[13px] font-semibold">
              B
            </text>

            <circle cx="310" cy="62" r="3.5" className="fill-sky-700" />
            <text x="312" y="52" textAnchor="middle" className="fill-slate-900 text-[13px] font-semibold">
              C
            </text>

            <circle cx="365" cy="28" r="3.5" className="fill-sky-700" />
            <text x="376" y="32" className="fill-slate-900 text-[13px] font-semibold">
              D
            </text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
