import React from 'react';
import { X, Download, ShieldCheck, Printer, Share2, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ReportViewerModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '820px' }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#D1FAE5', padding: '2px 8px', borderRadius: '4px' }}>
              NABL ACCREDITED REPORT • VERIFIED
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              Diagnostic Lab Report: {report.testName}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={() => alert(`Simulated Download: ${report.id}.pdf downloading to your browser...`)}
              className="btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Download size={14} /> PDF Download
            </button>
            <button onClick={onClose} className="btn-icon">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ background: '#F8FAFC', padding: '1.5rem' }}>
          
          {/* Virtual PDF Document Container */}
          <div style={{
            background: 'white',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            fontSize: '0.9rem'
          }}>
            
            {/* Header of Report Document */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #071E33', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#071E33', letterSpacing: '-0.02em' }}>
                  BHARATH JAN SEWA LABS
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#0D9488', fontWeight: 700 }}>
                  Central Reference Diagnostic Network
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Processing Facility: NABL Accredited Partner Lab (Cert: MC-2981)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Report ID: <strong>{report.id}</strong></div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Date: <strong>{report.date}</strong></div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800 }}>QR VERIFIED REPORT</div>
              </div>
            </div>

            {/* Patient Info Grid */}
            <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div><strong>Patient Name:</strong> {report.patientName}</div>
              <div><strong>Age / Gender:</strong> {report.age} Yrs / {report.gender}</div>
              <div><strong>Referred By:</strong> Self / Dr. Partner</div>
              <div><strong>Sample Collection:</strong> Home Visit (Cold Chain)</div>
            </div>

            {/* Test Results Matrix Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#071E33', color: 'white' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Test / Parameter</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Observed Result</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Reference Biological Range</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.highlights.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? 'white' : '#F8FAFC' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>{item.name}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: item.status.includes('Normal') ? '#071E33' : '#D97706' }}>
                      {item.value}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#64748B' }}>{item.normal}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '0.725rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '99px',
                        background: item.status.includes('Normal') ? '#D1FAE5' : '#FEF3C7',
                        color: item.status.includes('Normal') ? '#059669' : '#D97706'
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pathologist Signature Block */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified By Pathologist:</div>
                <div style={{ fontWeight: 800, color: '#071E33', fontSize: '0.95rem' }}>{report.pathologist}</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>MD Pathology (Reg. No. KMC 49120)</div>
              </div>
              
              {/* QR Mock */}
              <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569' }}>SCAN TO VERIFY</div>
                <div style={{ fontSize: '1.5rem' }}>📱 🔍</div>
              </div>
            </div>

          </div>

        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
