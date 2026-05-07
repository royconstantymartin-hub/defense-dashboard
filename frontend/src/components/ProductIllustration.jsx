import React from 'react';

const COLORS = {
  aircraft: { bg: '#EFF6FF', bg2: '#DBEAFE', primary: '#1D4ED8', secondary: '#3B82F6', light: '#93C5FD', accent: '#BFDBFE' },
  naval:    { bg: '#ECFEFF', bg2: '#CFFAFE', primary: '#0E7490', secondary: '#0891B2', light: '#67E8F9', accent: '#A5F3FC' },
  land:     { bg: '#FFFBEB', bg2: '#FEF3C7', primary: '#92400E', secondary: '#B45309', light: '#FCD34D', accent: '#FDE68A' },
  missile:  { bg: '#FFF1F2', bg2: '#FFE4E6', primary: '#9F1239', secondary: '#BE123C', light: '#FDA4AF', accent: '#FECDD3' },
  radar:    { bg: '#F0FDFA', bg2: '#CCFBF1', primary: '#065F46', secondary: '#0F766E', light: '#5EEAD4', accent: '#99F6E4' },
  cyber:    { bg: '#FAF5FF', bg2: '#F3E8FF', primary: '#6B21A8', secondary: '#7E22CE', light: '#C084FC', accent: '#E9D5FF' },
  space:    { bg: '#EEF2FF', bg2: '#E0E7FF', primary: '#3730A3', secondary: '#4338CA', light: '#818CF8', accent: '#C7D2FE' },
  default:  { bg: '#F8FAFC', bg2: '#F1F5F9', primary: '#475569', secondary: '#64748B', light: '#CBD5E1', accent: '#E2E8F0' },
};

function getColors(category) {
  return COLORS[category] || COLORS.default;
}

function FighterSVG({ c }) {
  return (
    <>
      <path d="M93 58 L18 108 L38 120 L90 82" fill={c.secondary} opacity="0.8"/>
      <path d="M107 58 L182 108 L162 120 L110 82" fill={c.secondary} opacity="0.8"/>
      <path d="M92 52 L62 66 L70 72 L92 60" fill={c.primary} opacity="0.7"/>
      <path d="M108 52 L138 66 L130 72 L108 60" fill={c.primary} opacity="0.7"/>
      <path d="M100 10 L113 52 L115 95 L109 128 L100 136 L91 128 L85 95 L87 52 Z" fill={c.primary}/>
      <ellipse cx="100" cy="48" rx="7" ry="16" fill={c.light} opacity="0.9"/>
      <ellipse cx="100" cy="44" rx="5" ry="10" fill="white" opacity="0.25"/>
      <path d="M89 100 L70 128 L89 122 L94 105" fill={c.primary} opacity="0.9"/>
      <path d="M111 100 L130 128 L111 122 L106 105" fill={c.primary} opacity="0.9"/>
      <ellipse cx="93" cy="128" rx="5" ry="5" fill={c.bg2}/>
      <ellipse cx="107" cy="128" rx="5" ry="5" fill={c.bg2}/>
      <ellipse cx="93" cy="128" rx="3" ry="3" fill={c.accent} opacity="0.8"/>
      <ellipse cx="107" cy="128" rx="3" ry="3" fill={c.accent} opacity="0.8"/>
      <path d="M100 10 L103 32 L100 36 L97 32 Z" fill="white" opacity="0.35"/>
    </>
  );
}

function HelicopterSVG({ c }) {
  return (
    <>
      <ellipse cx="95" cy="35" rx="75" ry="8" fill={c.light} opacity="0.35" stroke={c.secondary} strokeWidth="1"/>
      <rect x="22" y="33" width="146" height="4" rx="2" fill={c.primary} opacity="0.7"/>
      <rect x="92" y="18" width="6" height="34" rx="2" fill={c.primary} opacity="0.6" transform="rotate(60 95 35)"/>
      <rect x="92" y="35" width="6" height="20" fill={c.primary}/>
      <path d="M25 70 Q28 55 95 55 Q150 55 170 70 Q175 80 165 88 Q145 95 95 95 Q45 95 28 88 Q18 80 25 70Z" fill={c.primary}/>
      <path d="M25 70 Q40 52 75 55 L75 80 Q40 78 25 70Z" fill={c.light} opacity="0.8"/>
      <path d="M28 68 Q42 56 72 58 L72 75 Q42 73 28 68Z" fill="white" opacity="0.3"/>
      <rect x="30" y="78" width="25" height="10" rx="3" fill={c.secondary} opacity="0.8"/>
      <rect x="145" y="78" width="25" height="10" rx="3" fill={c.secondary} opacity="0.8"/>
      <path d="M163 75 L185 68 L185 72 L163 82" fill={c.primary} opacity="0.9"/>
      <rect x="183" y="52" width="4" height="32" rx="2" fill={c.secondary} opacity="0.8"/>
      <rect x="179" y="62" width="12" height="4" rx="2" fill={c.secondary} opacity="0.7"/>
      <rect x="45" y="94" width="60" height="5" rx="2" fill={c.secondary} opacity="0.6"/>
      <rect x="50" y="89" width="6" height="10" rx="1" fill={c.secondary} opacity="0.6"/>
      <rect x="99" y="89" width="6" height="10" rx="1" fill={c.secondary} opacity="0.6"/>
    </>
  );
}

function BomberSVG({ c }) {
  return (
    <>
      <path d="M100 30 L185 95 L175 110 L130 88 L100 95 L70 88 L25 110 L15 95 Z" fill={c.primary} opacity="0.9"/>
      <path d="M100 30 L130 88 L100 82 L70 88 Z" fill={c.light} opacity="0.25"/>
      <ellipse cx="100" cy="55" rx="10" ry="18" fill={c.light} opacity="0.7"/>
      <ellipse cx="100" cy="52" rx="7" ry="12" fill="white" opacity="0.2"/>
      <ellipse cx="72" cy="78" rx="8" ry="5" fill={c.secondary} opacity="0.8"/>
      <ellipse cx="128" cy="78" rx="8" ry="5" fill={c.secondary} opacity="0.8"/>
      <ellipse cx="58" cy="85" rx="7" ry="4" fill={c.secondary} opacity="0.7"/>
      <ellipse cx="142" cy="85" rx="7" ry="4" fill={c.secondary} opacity="0.7"/>
      <path d="M88 30 L112 30 L118 90 L100 95 L82 90 Z" fill={c.secondary} opacity="0.4"/>
    </>
  );
}

function UavSVG({ c }) {
  return (
    <>
      <path d="M100 68 L12 75 L18 82 L100 76 L182 82 L188 75 Z" fill={c.primary} opacity="0.85"/>
      <path d="M94 100 L65 125 L78 128 L98 108" fill={c.secondary} opacity="0.8"/>
      <path d="M106 100 L135 125 L122 128 L102 108" fill={c.secondary} opacity="0.8"/>
      <path d="M100 30 L108 65 L108 102 L100 110 L92 102 L92 65 Z" fill={c.primary}/>
      <circle cx="100" cy="42" r="9" fill={c.light} opacity="0.9"/>
      <circle cx="100" cy="42" r="6" fill={c.accent}/>
      <circle cx="97" cy="40" r="2" fill="white" opacity="0.6"/>
      <ellipse cx="100" cy="70" rx="8" ry="5" fill={c.secondary} opacity="0.7"/>
      <circle cx="12" cy="78" r="4" fill={c.secondary} opacity="0.8"/>
      <circle cx="188" cy="78" r="4" fill={c.secondary} opacity="0.8"/>
    </>
  );
}

function TransportSVG({ c }) {
  return (
    <>
      <path d="M100 18 L116 60 L118 105 L110 128 L100 132 L90 128 L82 105 L84 60 Z" fill={c.primary}/>
      <path d="M92 65 L10 90 L18 108 L92 85" fill={c.secondary} opacity="0.85"/>
      <path d="M108 65 L190 90 L182 108 L108 85" fill={c.secondary} opacity="0.85"/>
      <path d="M95 100 L88 128 L112 128 L105 100" fill={c.primary} opacity="0.9"/>
      <path d="M90 118 L60 128 L65 132 L90 124" fill={c.secondary} opacity="0.8"/>
      <path d="M110 118 L140 128 L135 132 L110 124" fill={c.secondary} opacity="0.8"/>
      <ellipse cx="55" cy="97" rx="8" ry="4" fill={c.light} opacity="0.9"/>
      <ellipse cx="75" cy="92" rx="8" ry="4" fill={c.light} opacity="0.9"/>
      <ellipse cx="125" cy="92" rx="8" ry="4" fill={c.light} opacity="0.9"/>
      <ellipse cx="145" cy="97" rx="8" ry="4" fill={c.light} opacity="0.9"/>
      <ellipse cx="100" cy="40" rx="8" ry="18" fill={c.light} opacity="0.7"/>
      <ellipse cx="100" cy="36" rx="5" ry="12" fill="white" opacity="0.25"/>
    </>
  );
}

function DestroyerSVG({ c }) {
  return (
    <>
      <path d="M12 85 L30 62 L172 62 L188 78 L188 95 L12 95 Z" fill={c.primary}/>
      <path d="M12 85 L30 62 L30 72 L18 88 Z" fill={c.secondary} opacity="0.9"/>
      <path d="M12 88 L188 88 L188 91 L12 91 Z" fill={c.light} opacity="0.5"/>
      <rect x="42" y="40" width="65" height="22" rx="2" fill={c.secondary}/>
      <rect x="55" y="22" width="38" height="18" rx="2" fill={c.secondary}/>
      <rect x="58" y="25" width="6" height="5" rx="1" fill={c.light} opacity="0.8"/>
      <rect x="68" y="25" width="6" height="5" rx="1" fill={c.light} opacity="0.8"/>
      <rect x="78" y="25" width="6" height="5" rx="1" fill={c.light} opacity="0.8"/>
      <rect x="88" y="25" width="6" height="5" rx="1" fill={c.light} opacity="0.8"/>
      <rect x="72" y="5" width="3" height="18" fill={c.primary}/>
      <line x1="62" y1="8" x2="85" y2="8" stroke={c.primary} strokeWidth="2"/>
      <ellipse cx="85" cy="8" rx="5" ry="3" fill="none" stroke={c.primary} strokeWidth="1.5"/>
      <rect x="120" y="40" width="50" height="22" rx="2" fill={c.secondary} opacity="0.9"/>
      <path d="M110 30 L116 40 L126 40 L130 30 Z" fill={c.primary} opacity="0.8"/>
      <rect x="30" y="56" width="18" height="10" rx="2" fill={c.primary} opacity="0.9"/>
      <rect x="20" y="59" width="30" height="4" rx="1" fill={c.primary}/>
      <rect x="45" y="56" width="8" height="6" rx="1" fill={c.accent} opacity="0.7"/>
      <rect x="55" y="56" width="8" height="6" rx="1" fill={c.accent} opacity="0.7"/>
      <rect x="155" y="56" width="14" height="9" rx="2" fill={c.primary} opacity="0.9"/>
      <rect x="153" y="58" width="22" height="4" rx="1" fill={c.primary}/>
      <path d="M12 92 Q20 88 12 98" fill="none" stroke={c.light} strokeWidth="1.5" opacity="0.6"/>
    </>
  );
}

function SubmarineSVG({ c }) {
  return (
    <>
      <path d="M20 75 Q20 58 100 56 Q180 58 182 75 Q180 92 100 94 Q20 92 20 75 Z" fill={c.primary}/>
      <path d="M22 72 Q100 62 178 72 Q100 66 22 72 Z" fill={c.light} opacity="0.3"/>
      <path d="M80 56 L80 35 L120 35 L120 56 Z" fill={c.secondary}/>
      <path d="M82 35 L82 24 L92 24 L92 35" fill={c.secondary} opacity="0.9"/>
      <rect x="84" y="14" width="3" height="12" fill={c.primary}/>
      <rect x="82" y="14" width="8" height="3" rx="1" fill={c.primary}/>
      <path d="M168 68 L185 52 L188 60 L172 72" fill={c.primary} opacity="0.9"/>
      <path d="M168 82 L185 98 L188 90 L172 78" fill={c.primary} opacity="0.9"/>
      <circle cx="178" cy="75" r="8" fill="none" stroke={c.secondary} strokeWidth="2"/>
      <line x1="170" y1="75" x2="186" y2="75" stroke={c.secondary} strokeWidth="2"/>
      <line x1="178" y1="67" x2="178" y2="83" stroke={c.secondary} strokeWidth="2"/>
      <ellipse cx="30" cy="68" rx="4" ry="6" fill={c.accent} opacity="0.8"/>
      <ellipse cx="30" cy="82" rx="4" ry="6" fill={c.accent} opacity="0.8"/>
      <circle cx="18" cy="75" r="2" fill={c.light} opacity="0.5"/>
      <circle cx="14" cy="70" r="1.5" fill={c.light} opacity="0.4"/>
      <circle cx="12" cy="80" r="1" fill={c.light} opacity="0.3"/>
    </>
  );
}

function CarrierSVG({ c }) {
  return (
    <>
      <path d="M15 65 L15 100 L185 100 L185 58 L150 48 L80 48 Z" fill={c.primary}/>
      <path d="M15 65 L80 48 L80 72 L15 84 Z" fill={c.secondary} opacity="0.7"/>
      <line x1="30" y1="62" x2="175" y2="62" stroke={c.light} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6"/>
      <line x1="30" y1="92" x2="175" y2="92" stroke={c.light} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6"/>
      <rect x="148" y="52" width="28" height="34" rx="2" fill={c.secondary}/>
      <rect x="158" y="42" width="4" height="12" fill={c.primary}/>
      <rect x="150" y="44" width="20" height="3" fill={c.primary}/>
      <path d="M40 68 L50 65 L60 68 L50 72" fill={c.light} opacity="0.7"/>
      <path d="M70 68 L80 65 L90 68 L80 72" fill={c.light} opacity="0.7"/>
      <path d="M110 68 L120 65 L130 68 L120 72" fill={c.light} opacity="0.7"/>
      <path d="M15 100 L185 100 L185 108 Q100 114 15 108 Z" fill={c.secondary} opacity="0.6"/>
      <path d="M12 100 Q5 105 12 112" fill="none" stroke={c.light} strokeWidth="1.5" opacity="0.5"/>
    </>
  );
}

function UsvSVG({ c }) {
  return (
    <>
      <path d="M25 72 L38 55 L162 55 L175 68 L175 90 L25 90 Z" fill={c.primary}/>
      <rect x="25" y="82" width="150" height="5" fill={c.light} opacity="0.4"/>
      <rect x="50" y="40" width="100" height="18" rx="3" fill={c.secondary}/>
      <rect x="95" y="18" width="4" height="24" fill={c.primary}/>
      <circle cx="97" cy="16" r="6" fill={c.secondary}/>
      <circle cx="97" cy="16" r="3" fill={c.light} opacity="0.8"/>
      <circle cx="97" cy="62" r="10" fill="none" stroke={c.light} strokeWidth="1.5" opacity="0.7"/>
      <circle cx="97" cy="62" r="4" fill={c.light} opacity="0.8"/>
      <line x1="87" y1="62" x2="107" y2="62" stroke={c.light} strokeWidth="1" opacity="0.6"/>
      <line x1="97" y1="52" x2="97" y2="72" stroke={c.light} strokeWidth="1" opacity="0.6"/>
      <path d="M22 82 Q15 87 22 93" fill="none" stroke={c.light} strokeWidth="1.5" opacity="0.5"/>
    </>
  );
}

function TankSVG({ c }) {
  return (
    <>
      <path d="M22 88 L22 108 Q22 114 30 114 L90 114 Q98 114 98 108 L98 88 Q98 82 90 82 L30 82 Q22 82 22 88 Z" fill={c.secondary} opacity="0.85"/>
      <path d="M102 88 L102 108 Q102 114 110 114 L170 114 Q178 114 178 108 L178 88 Q178 82 170 82 L110 82 Q102 82 102 88 Z" fill={c.secondary} opacity="0.85"/>
      {[32, 50, 68, 86].map(x => (
        <circle key={x} cx={x} cy="98" r="9" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>
      ))}
      {[114, 132, 150, 168].map(x => (
        <circle key={x} cx={x} cy="98" r="9" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>
      ))}
      <rect x="15" y="65" width="170" height="18" rx="2" fill={c.primary}/>
      <path d="M15 65 L35 48 L165 48 L185 65 Z" fill={c.secondary}/>
      <ellipse cx="100" cy="52" rx="42" ry="16" fill={c.secondary}/>
      <path d="M62 52 Q62 26 100 24 Q138 26 138 52 Z" fill={c.primary}/>
      <circle cx="88" cy="38" r="7" fill={c.secondary}/>
      <circle cx="88" cy="38" r="4" fill={c.accent} opacity="0.8"/>
      <rect x="100" y="36" width="85" height="6" rx="2" fill={c.primary}/>
      <rect x="102" y="37" width="81" height="4" rx="1" fill={c.secondary} opacity="0.5"/>
      <rect x="68" y="30" width="12" height="8" rx="1" fill={c.accent} opacity="0.7"/>
      <rect x="82" y="28" width="12" height="8" rx="1" fill={c.accent} opacity="0.7"/>
      <line x1="22" y1="108" x2="98" y2="108" stroke={c.bg2} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      <line x1="102" y1="108" x2="178" y2="108" stroke={c.bg2} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
    </>
  );
}

function IfvSVG({ c }) {
  return (
    <>
      <path d="M18 85 Q18 112 28 112 L90 112 Q100 112 100 105 L100 85 Q100 78 90 78 L28 78 Q18 78 18 85Z" fill={c.secondary} opacity="0.85"/>
      <path d="M100 85 Q100 112 110 112 L172 112 Q182 112 182 105 L182 85 Q182 78 172 78 L110 78 Q100 78 100 85Z" fill={c.secondary} opacity="0.85"/>
      {[30, 50, 70, 88].map(x => <circle key={x} cx={x} cy="95" r="9" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>)}
      {[112, 130, 150, 170].map(x => <circle key={x} cx={x} cy="95" r="9" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>)}
      <path d="M20 48 L30 40 L170 40 L180 48 L182 78 L18 78 Z" fill={c.primary}/>
      <path d="M20 48 L38 30 L165 30 L180 48" fill={c.secondary} opacity="0.9"/>
      <rect x="75" y="28" width="50" height="16" rx="4" fill={c.secondary}/>
      <rect x="112" y="32" width="55" height="5" rx="2" fill={c.primary}/>
      <rect x="128" y="26" width="20" height="6" rx="1" fill={c.accent} opacity="0.8"/>
      <rect x="82" y="20" width="14" height="10" rx="2" fill={c.secondary}/>
      <circle cx="89" cy="25" r="3" fill={c.accent} opacity="0.7"/>
      <rect x="18" y="70" width="164" height="12" rx="1" fill={c.secondary} opacity="0.6"/>
    </>
  );
}

function ArtillerySVG({ c }) {
  return (
    <>
      <path d="M20 105 L60 90 L60 100 L20 115 Z" fill={c.secondary} opacity="0.8"/>
      <path d="M20 75 L60 62 L60 72 L20 85 Z" fill={c.secondary} opacity="0.8"/>
      <circle cx="65" cy="95" r="18" fill="none" stroke={c.primary} strokeWidth="5"/>
      <circle cx="65" cy="95" r="6" fill={c.primary}/>
      {[0, 45, 90, 135].map(a => (
        <line key={a}
          x1={65 + 8 * Math.cos(a * Math.PI / 180)} y1={95 + 8 * Math.sin(a * Math.PI / 180)}
          x2={65 + 14 * Math.cos(a * Math.PI / 180)} y2={95 + 14 * Math.sin(a * Math.PI / 180)}
          stroke={c.primary} strokeWidth="3"/>
      ))}
      <rect x="60" y="82" width="80" height="25" rx="3" fill={c.primary}/>
      <rect x="130" y="78" width="25" height="32" rx="4" fill={c.secondary}/>
      <rect x="60" y="87" width="130" height="10" rx="3" fill={c.primary}/>
      <rect x="62" y="88" width="126" height="8" rx="2" fill={c.secondary} opacity="0.4"/>
      <rect x="185" y="86" width="10" height="12" rx="2" fill={c.secondary}/>
      <rect x="182" y="89" width="3" height="6" fill={c.accent} opacity="0.8"/>
      <rect x="195" y="89" width="3" height="6" fill={c.accent} opacity="0.8"/>
      <path d="M60 90 L42 55 L50 52 L68 88" fill={c.secondary} opacity="0.9"/>
      <circle cx="46" cy="55" r="4" fill={c.secondary}/>
      <path d="M72 68 L72 82 L88 82 L88 68" fill={c.secondary} opacity="0.7"/>
    </>
  );
}

function UgvSVG({ c }) {
  return (
    <>
      <path d="M18 80 Q18 112 32 112 L88 112 Q102 112 102 98 L102 80 Q102 66 88 66 L32 66 Q18 66 18 80Z" fill={c.secondary} opacity="0.8"/>
      <path d="M98 80 Q98 112 112 112 L168 112 Q182 112 182 98 L182 80 Q182 66 168 66 L112 66 Q98 66 98 80Z" fill={c.secondary} opacity="0.8"/>
      {[30, 55, 80].map(x => <circle key={x} cx={x} cy="89" r="8" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>)}
      {[110, 135, 160].map(x => <circle key={x} cx={x} cy="89" r="8" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>)}
      <rect x="20" y="40" width="160" height="28" rx="6" fill={c.primary}/>
      <rect x="80" y="20" width="40" height="22" rx="5" fill={c.secondary}/>
      <circle cx="93" cy="31" r="7" fill={c.light} opacity="0.9"/>
      <circle cx="93" cy="31" r="4" fill={c.accent}/>
      <circle cx="107" cy="31" r="5" fill={c.light} opacity="0.8"/>
      <circle cx="107" cy="31" r="3" fill={c.accent} opacity="0.9"/>
      <rect x="95" y="8" width="3" height="14" fill={c.primary}/>
      <circle cx="96" cy="7" r="3" fill={c.secondary}/>
      <rect x="30" y="44" width="55" height="20" rx="3" fill={c.secondary} opacity="0.7"/>
      <rect x="115" y="44" width="55" height="20" rx="3" fill={c.secondary} opacity="0.7"/>
      {[45, 55, 65, 75].map(x => <line key={x} x1={x} y1="44" x2={x} y2="68" stroke={c.bg2} strokeWidth="0.8" opacity="0.8"/>)}
      {[125, 135, 145, 155].map(x => <line key={x} x1={x} y1="44" x2={x} y2="68" stroke={c.bg2} strokeWidth="0.8" opacity="0.8"/>)}
    </>
  );
}

function CruiseMissileSVG({ c }) {
  return (
    <>
      <path d="M178 72 Q195 60 198 72 Q195 80 178 78 Z" fill={c.light} opacity="0.7"/>
      <path d="M178 73 Q190 68 192 73 Q190 77 178 76 Z" fill="white" opacity="0.5"/>
      <path d="M22 65 L40 55 L175 58 L178 72 L178 78 L175 92 L40 95 L22 85 Z" fill={c.primary}/>
      <path d="M22 65 L12 75 L22 85 Z" fill={c.secondary}/>
      <path d="M90 92 L110 92 L112 100 L88 100 Z" fill={c.secondary}/>
      <path d="M90 92 Q100 95 110 92" fill={c.accent} opacity="0.7"/>
      <path d="M95 58 L90 32 L115 32 L110 58" fill={c.secondary} opacity="0.85"/>
      <path d="M165 78 L165 95 L175 95 L178 78" fill={c.secondary} opacity="0.8"/>
      <path d="M162 72 L162 58 L175 58 L178 72" fill={c.secondary} opacity="0.8"/>
      <path d="M162 65 L145 48 L148 55 L162 65" fill={c.secondary} opacity="0.7"/>
      <path d="M162 85 L145 102 L148 95 L162 85" fill={c.secondary} opacity="0.7"/>
      <line x1="80" y1="57" x2="80" y2="93" stroke={c.bg2} strokeWidth="1" opacity="0.6"/>
      <line x1="140" y1="58" x2="140" y2="92" stroke={c.bg2} strokeWidth="1" opacity="0.6"/>
      <circle cx="22" cy="75" r="6" fill={c.light} opacity="0.7"/>
      <circle cx="22" cy="75" r="3" fill={c.accent} opacity="0.8"/>
    </>
  );
}

function BallisticSVG({ c }) {
  return (
    <>
      <path d="M82 130 Q100 145 118 130 Q110 150 100 158 Q90 150 82 130Z" fill={c.light} opacity="0.5"/>
      <path d="M88 130 Q100 142 112 130 Q106 145 100 150 Q94 145 88 130Z" fill="white" opacity="0.4"/>
      <path d="M72 30 Q72 25 100 20 Q128 25 128 30 L132 125 L100 130 L68 125 Z" fill={c.primary}/>
      <path d="M72 30 L100 8 L128 30 Z" fill={c.secondary}/>
      <path d="M78 28 L100 12 L122 28 L125 42 L75 42 Z" fill={c.primary} opacity="0.9"/>
      <rect x="72" y="85" width="56" height="4" fill={c.secondary} opacity="0.7"/>
      <path d="M68 108 L48 128 L68 122 L72 108" fill={c.secondary} opacity="0.85"/>
      <path d="M132 108 L152 128 L132 122 L128 108" fill={c.secondary} opacity="0.85"/>
      <path d="M68 118 L58 135 L72 128 L72 118" fill={c.secondary} opacity="0.7"/>
      <path d="M132 118 L142 135 L128 128 L128 118" fill={c.secondary} opacity="0.7"/>
      {[50, 70, 90].map(y => (
        <line key={y} x1={75 + (y - 30) * 0.28} y1={y} x2={125 - (y - 30) * 0.28} y2={y} stroke={c.bg2} strokeWidth="1" opacity="0.5"/>
      ))}
      <rect x="84" y="55" width="32" height="5" rx="1" fill={c.accent} opacity="0.7"/>
    </>
  );
}

function SamSVG({ c }) {
  return (
    <>
      <rect x="20" y="88" width="160" height="22" rx="4" fill={c.secondary}/>
      {[32, 58, 142, 168].map(x => <circle key={x} cx={x} cy="108" r="10" fill={c.primary} stroke={c.bg2} strokeWidth="2"/>)}
      <rect x="40" y="70" width="120" height="20" rx="3" fill={c.primary}/>
      <circle cx="100" cy="80" r="8" fill={c.secondary}/>
      {[55, 75, 95, 115, 135].map((x, i) => (
        <g key={x}>
          <rect x={x - 8} y="18" width="16" height="52" rx="4" fill={i % 2 === 0 ? c.primary : c.secondary} opacity="0.9"/>
          <path d={`M${x - 5} 18 L${x} 10 L${x + 5} 18`} fill={c.secondary}/>
          <circle cx={x} cy="20" r="3" fill={c.light} opacity="0.7"/>
        </g>
      ))}
      <rect x="148" y="60" width="20" height="14" rx="2" fill={c.secondary}/>
      <path d="M148 62 Q158 55 168 62" fill="none" stroke={c.primary} strokeWidth="2"/>
    </>
  );
}

function RadarSVG({ c }) {
  return (
    <>
      <circle cx="100" cy="75" r="55" fill="none" stroke={c.light} strokeWidth="0.8" opacity="0.4"/>
      <circle cx="100" cy="75" r="40" fill="none" stroke={c.light} strokeWidth="0.8" opacity="0.5"/>
      <circle cx="100" cy="75" r="25" fill="none" stroke={c.light} strokeWidth="0.8" opacity="0.6"/>
      <circle cx="100" cy="75" r="10" fill="none" stroke={c.light} strokeWidth="0.8" opacity="0.7"/>
      <line x1="45" y1="75" x2="155" y2="75" stroke={c.light} strokeWidth="0.8" opacity="0.4"/>
      <line x1="100" y1="20" x2="100" y2="130" stroke={c.light} strokeWidth="0.8" opacity="0.4"/>
      <line x1="100" y1="75" x2="100" y2="20" stroke={c.secondary} strokeWidth="2" opacity="0.8"/>
      <path d="M100 75 L100 20 Q140 35 100 75" fill={c.secondary} opacity="0.15"/>
      <path d="M65 55 Q65 30 100 28 Q135 30 135 55 Z" fill={c.primary}/>
      <path d="M68 52 Q68 33 100 31 Q132 33 132 52 Z" fill={c.secondary} opacity="0.7"/>
      <circle cx="100" cy="42" r="5" fill={c.primary}/>
      <rect x="97" y="42" width="6" height="14" fill={c.primary}/>
      <rect x="97" y="55" width="6" height="20" fill={c.secondary}/>
      <rect x="88" y="75" width="24" height="15" rx="3" fill={c.primary}/>
      <rect x="80" y="88" width="40" height="8" rx="2" fill={c.secondary}/>
      <rect x="75" y="95" width="50" height="5" rx="1" fill={c.primary} opacity="0.7"/>
      <circle cx="120" cy="52" r="3" fill={c.secondary} opacity="0.9"/>
      <circle cx="78" cy="62" r="2" fill={c.secondary} opacity="0.7"/>
      <circle cx="130" cy="70" r="2.5" fill={c.secondary} opacity="0.8"/>
    </>
  );
}

function PhasedArraySVG({ c }) {
  return (
    <>
      <rect x="30" y="20" width="140" height="90" rx="4" fill={c.primary}/>
      {[...Array(7)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <rect key={`${row}-${col}`}
            x={36 + col * 13} y={26 + row * 12}
            width="10" height="8" rx="1"
            fill={c.secondary} opacity={0.5 + (row + col) * 0.03}
          />
        ))
      )}
      <path d="M100 20 Q140 10 175 30" fill="none" stroke={c.light} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6"/>
      <path d="M100 20 Q140 5 185 20" fill="none" stroke={c.light} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
      <path d="M100 20 Q142 0 195 12" fill="none" stroke={c.light} strokeWidth="1" strokeDasharray="5 3" opacity="0.4"/>
      <rect x="82" y="110" width="36" height="18" rx="3" fill={c.secondary}/>
      <rect x="65" y="126" width="70" height="10" rx="3" fill={c.primary}/>
      <rect x="55" y="134" width="90" height="6" rx="2" fill={c.secondary} opacity="0.7"/>
    </>
  );
}

function CyberSVG({ c }) {
  return (
    <>
      {[30, 50, 70, 90, 110, 130, 150, 170].map(x => (
        <line key={`v${x}`} x1={x} y1="10" x2={x} y2="150" stroke={c.light} strokeWidth="0.8" opacity="0.3"/>
      ))}
      {[25, 45, 65, 85, 105, 125].map(y => (
        <line key={`h${y}`} x1="20" y1={y} x2="180" y2={y} stroke={c.light} strokeWidth="0.8" opacity="0.3"/>
      ))}
      {[30, 70, 110, 150].map(x =>
        [25, 65, 105].map(y => (
          <circle key={`n${x}-${y}`} cx={x} cy={y} r="3" fill={c.secondary} opacity="0.6"/>
        ))
      )}
      <rect x="62" y="42" width="76" height="76" rx="6" fill={c.primary}/>
      <rect x="68" y="48" width="64" height="64" rx="4" fill={c.secondary}/>
      <rect x="74" y="54" width="25" height="25" rx="2" fill={c.primary} opacity="0.8"/>
      <rect x="101" y="54" width="25" height="25" rx="2" fill={c.primary} opacity="0.8"/>
      <rect x="74" y="81" width="25" height="25" rx="2" fill={c.primary} opacity="0.8"/>
      <rect x="101" y="81" width="25" height="25" rx="2" fill={c.primary} opacity="0.6"/>
      <line x1="100" y1="8" x2="100" y2="20" stroke={c.secondary} strokeWidth="2.5"/>
      <line x1="85" y1="12" x2="100" y2="8" stroke={c.secondary} strokeWidth="1.5"/>
      <line x1="115" y1="12" x2="100" y2="8" stroke={c.secondary} strokeWidth="1.5"/>
      <circle cx="30" cy="65" r="4" fill={c.secondary} opacity="0.9"/>
      <circle cx="150" cy="105" r="4" fill={c.secondary} opacity="0.9"/>
      <line x1="30" y1="65" x2="62" y2="80" stroke={c.secondary} strokeWidth="1.5" opacity="0.7"/>
      <line x1="150" y1="105" x2="138" y2="95" stroke={c.secondary} strokeWidth="1.5" opacity="0.7"/>
    </>
  );
}

function SatelliteSVG({ c }) {
  return (
    <>
      {[[25, 20], [45, 12], [155, 18], [175, 25], [165, 105], [30, 108], [50, 128], [170, 118]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill={c.secondary} opacity="0.6"/>
      ))}
      <path d="M5 155 Q50 100 100 95 Q150 100 195 155" fill={c.bg2} opacity="0.6"/>
      <path d="M5 160 Q50 105 100 100 Q150 105 195 160" fill={c.accent} opacity="0.4"/>
      <rect x="10" y="60" width="60" height="40" rx="2" fill={c.primary}/>
      <line x1="10" y1="73" x2="70" y2="73" stroke={c.bg2} strokeWidth="1.2" opacity="0.7"/>
      <line x1="10" y1="87" x2="70" y2="87" stroke={c.bg2} strokeWidth="1.2" opacity="0.7"/>
      {[20, 30, 40, 50, 60].map(x => (
        <line key={x} x1={x} y1="60" x2={x} y2="100" stroke={c.bg2} strokeWidth="1" opacity="0.5"/>
      ))}
      <rect x="130" y="60" width="60" height="40" rx="2" fill={c.primary}/>
      <line x1="130" y1="73" x2="190" y2="73" stroke={c.bg2} strokeWidth="1.2" opacity="0.7"/>
      <line x1="130" y1="87" x2="190" y2="87" stroke={c.bg2} strokeWidth="1.2" opacity="0.7"/>
      {[140, 150, 160, 170, 180].map(x => (
        <line key={x} x1={x} y1="60" x2={x} y2="100" stroke={c.bg2} strokeWidth="1" opacity="0.5"/>
      ))}
      <rect x="70" y="76" width="22" height="8" fill={c.secondary}/>
      <rect x="108" y="76" width="22" height="8" fill={c.secondary}/>
      <rect x="80" y="52" width="40" height="56" rx="5" fill={c.secondary}/>
      <rect x="84" y="56" width="32" height="48" rx="3" fill={c.primary}/>
      <rect x="86" y="60" width="28" height="12" rx="2" fill={c.secondary} opacity="0.8"/>
      <rect x="86" y="76" width="28" height="12" rx="2" fill={c.secondary} opacity="0.8"/>
      <rect x="86" y="92" width="28" height="8" rx="2" fill={c.secondary} opacity="0.8"/>
      <path d="M92 52 Q100 42 108 52" fill="none" stroke={c.secondary} strokeWidth="2"/>
      <rect x="98" y="40" width="4" height="14" fill={c.secondary}/>
      <rect x="84" y="36" width="3" height="18" fill={c.primary} opacity="0.7"/>
      <rect x="113" y="36" width="3" height="18" fill={c.primary} opacity="0.7"/>
    </>
  );
}

function SpacePlaneSVG({ c }) {
  return (
    <>
      {[[20, 15], [45, 8], [160, 12], [185, 22], [170, 115], [25, 118]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill={c.light} opacity="0.5"/>
      ))}
      <path d="M100 8 L115 38 L125 75 L118 110 L100 118 L82 110 L75 75 L85 38 Z" fill={c.primary}/>
      <path d="M88 38 L15 95 L35 108 L85 78" fill={c.secondary} opacity="0.85"/>
      <path d="M112 38 L185 95 L165 108 L115 78" fill={c.secondary} opacity="0.85"/>
      <rect x="88" y="55" width="24" height="35" rx="3" fill={c.accent} opacity="0.8"/>
      <ellipse cx="100" cy="35" rx="8" ry="16" fill={c.light} opacity="0.7"/>
      <rect x="86" y="108" width="12" height="10" rx="3" fill={c.secondary}/>
      <rect x="102" y="108" width="12" height="10" rx="3" fill={c.secondary}/>
      <ellipse cx="92" cy="119" rx="5" ry="4" fill={c.light} opacity="0.5"/>
      <ellipse cx="108" cy="119" rx="5" ry="4" fill={c.light} opacity="0.5"/>
      <path d="M88 100 L72 118 L88 112 L90 104" fill={c.primary} opacity="0.85"/>
      <path d="M112 100 L128 118 L112 112 L110 104" fill={c.primary} opacity="0.85"/>
    </>
  );
}

export default function ProductIllustration({ category, productType, name = "", className = "" }) {
  const c = getColors(category);
  const pt = (productType || '').toLowerCase();
  const nm = (name || '').toLowerCase();

  let IllustrationContent;

  if (category === 'aircraft') {
    if (nm.includes('helicopter') || nm.includes('apache') || nm.includes('black hawk') || nm.includes('chinook') || nm.includes('seahawk') || nm.includes('merlin') || nm.includes('tigre') || nm.includes('nh90') || pt.includes('helicopter')) {
      IllustrationContent = <HelicopterSVG c={c} />;
    } else if (nm.includes('b-2') || nm.includes('b-21') || nm.includes('b-52') || nm.includes('nEUROn') || nm.includes('flying wing') || pt.includes('bomber')) {
      IllustrationContent = <BomberSVG c={c} />;
    } else if (nm.includes('mq-') || nm.includes('rq-') || nm.includes('bayraktar') || nm.includes('reaper') || nm.includes('global hawk') || nm.includes('triton') || nm.includes('gray eagle') || nm.includes('ghost bat') || nm.includes('kizilelma') || nm.includes('fury') || nm.includes('neuron') || pt.includes('uav') || pt.includes('drone') || pt.includes('ucav') || pt.includes('rpas')) {
      IllustrationContent = <UavSVG c={c} />;
    } else if (nm.includes('c-17') || nm.includes('a400') || nm.includes('c-130') || nm.includes('kc-') || nm.includes('p-8') || nm.includes('e-2') || nm.includes('e-3') || nm.includes('e-7') || nm.includes('rc-135') || nm.includes('ac-130') || pt.includes('transport') || pt.includes('tanker') || pt.includes('aew')) {
      IllustrationContent = <TransportSVG c={c} />;
    } else {
      IllustrationContent = <FighterSVG c={c} />;
    }
  } else if (category === 'naval') {
    if (nm.includes('submarine') || nm.includes('ssbn') || nm.includes('ssn') || nm.includes('triomphant') || nm.includes('barracuda') || nm.includes('astute') || nm.includes('virginia') || nm.includes('columbia') || nm.includes('dreadnought') || nm.includes('soryu') || nm.includes('type 212') || nm.includes('scorpene') || pt.includes('submarine') || pt.includes('ssn') || pt.includes('ssbn')) {
      IllustrationContent = <SubmarineSVG c={c} />;
    } else if (nm.includes('carrier') || nm.includes('ford') || nm.includes('queen elizabeth') || nm.includes('charles de gaulle') || nm.includes('mistral') || nm.includes('lhd') || pt.includes('carrier') || pt.includes('lhd')) {
      IllustrationContent = <CarrierSVG c={c} />;
    } else if (nm.includes('usv') || nm.includes('uuv') || nm.includes('autonomous') || pt.includes('usv') || pt.includes('uuv')) {
      IllustrationContent = <UsvSVG c={c} />;
    } else {
      IllustrationContent = <DestroyerSVG c={c} />;
    }
  } else if (category === 'land') {
    if (nm.includes('ugv') || nm.includes('robot') || nm.includes('themis') || nm.includes('type-x') || nm.includes('vision 60') || pt.includes('ugv')) {
      IllustrationContent = <UgvSVG c={c} />;
    } else if (nm.includes('howitzer') || nm.includes('caesar') || nm.includes('pzh') || nm.includes('archer') || nm.includes('k9') || nm.includes('m109') || nm.includes('as-90') || nm.includes('mlrs') || nm.includes('himars') || nm.includes('m270') || nm.includes('lru') || nm.includes('zuzana') || pt.includes('artillery') || pt.includes('howitzer') || pt.includes('spg') || pt.includes('mlrs')) {
      IllustrationContent = <ArtillerySVG c={c} />;
    } else if (nm.includes('ifv') || nm.includes('apc') || nm.includes('bradley') || nm.includes('puma') || nm.includes('boxer') || nm.includes('lynx') || nm.includes('vbci') || nm.includes('cv90') || nm.includes('marder') || nm.includes('namer') || nm.includes('stryker') || nm.includes('k21') || nm.includes('piranha') || nm.includes('pandur') || nm.includes('amv') || nm.includes('eitan') || nm.includes('vbmr') || nm.includes('griffon') || pt.includes('ifv') || pt.includes('apc') || pt.includes('aifv') || pt.includes('mrap')) {
      IllustrationContent = <IfvSVG c={c} />;
    } else {
      IllustrationContent = <TankSVG c={c} />;
    }
  } else if (category === 'missile') {
    if (nm.includes('patriot') || nm.includes('s-400') || nm.includes('iron dome') || nm.includes('thaad') || nm.includes('nasams') || nm.includes('aster') || nm.includes('samp') || nm.includes('david') || nm.includes('arrow') || nm.includes('barak') || nm.includes('spyder') || nm.includes('akash') || nm.includes('iris-t') || nm.includes('mistral') || nm.includes('stinger') || nm.includes('starstreak') || nm.includes('crotale') || nm.includes('shorad') || pt.includes('sam') || pt.includes('shorad') || pt.includes('manpads') || pt.includes('aad')) {
      IllustrationContent = <SamSVG c={c} />;
    } else if (nm.includes('ballistic') || nm.includes('icbm') || nm.includes('kinzhal') || pt.includes('ballistic') || pt.includes('irbm')) {
      IllustrationContent = <BallisticSVG c={c} />;
    } else {
      IllustrationContent = <CruiseMissileSVG c={c} />;
    }
  } else if (category === 'radar') {
    if (nm.includes('aesa') || nm.includes('phased array') || nm.includes('spy-') || nm.includes('amdr') || nm.includes('sea fire') || nm.includes('empar') || nm.includes('kronos') || nm.includes('smart-l') || nm.includes('trml') || nm.includes('elm-') || nm.includes('apg-') || nm.includes('sabr') || pt.includes('aesa') || pt.includes('phased')) {
      IllustrationContent = <PhasedArraySVG c={c} />;
    } else {
      IllustrationContent = <RadarSVG c={c} />;
    }
  } else if (category === 'cyber') {
    IllustrationContent = <CyberSVG c={c} />;
  } else if (category === 'space') {
    if (nm.includes('x-37') || nm.includes('space plane') || pt.includes('spaceplane')) {
      IllustrationContent = <SpacePlaneSVG c={c} />;
    } else {
      IllustrationContent = <SatelliteSVG c={c} />;
    }
  } else {
    IllustrationContent = <CyberSVG c={c} />;
  }

  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      <rect width="200" height="160" fill={c.bg}/>
      {IllustrationContent}
    </svg>
  );
}
