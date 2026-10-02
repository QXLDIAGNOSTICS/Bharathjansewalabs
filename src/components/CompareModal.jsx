import React from 'react';
import { X, Check, Minus, ShoppingBag } from 'lucide-react';

export default function CompareModal({ comparedPackages, onClose, onBookPackage, onRemove }) {
  if (!comparedPackages || comparedPackages.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '960px' }}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              Compare Health Checkup Packages
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Side-by-side diagnostic parameters and pricing breakdown
            </p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ overflowX: 'auto' }}>
          <table className="compare-matrix-table">
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Feature / Parameter</th>
                {comparedPackages.map(pkg => (
                  <th key={pkg.id} style={{ minWidth: '200px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '4px' }}>
                      {pkg.name}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284C7' }}>
                      ₹{pkg.price}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', textDecoration: 'line-through' }}>
                      MRP ₹{pkg.mrp}
                    </div>
                    <div style={{ margin: '8px 0' }}>
                      <button 
                        onClick={() => onBookPackage(pkg)}
                        className="btn-primary"
                        style={{ padding: '4px 12px', fontSize: '0.8rem', width: '100%', justifyContent: 'center' }}
                      >
                        Book Package
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(pkg.id)}
                      style={{ fontSize: '0.75rem', color: '#EF4444', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Total Parameters</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center', fontWeight: 800, color: '#0D9488', fontSize: '1.1rem' }}>
                    {pkg.parametersCount} Tests
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Sample Required</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>{pkg.sampleType}</td>
                ))}
              </tr>
              <tr>
                <td><strong>Fasting Rule</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center', fontSize: '0.85rem' }}>{pkg.fasting}</td>
                ))}
              </tr>
              <tr>
                <td><strong>Report Turnaround</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>{pkg.tat}</td>
                ))}
              </tr>
              <tr>
                <td><strong>Complete Blood Count (CBC)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}><Check size={20} color="#059669" /></td>
                ))}
              </tr>
              <tr>
                <td><strong>Diabetic Profile (HbA1c & Glucose)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}><Check size={20} color="#059669" /></td>
                ))}
              </tr>
              <tr>
                <td><strong>Liver Function Test (LFT - 11)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}><Check size={20} color="#059669" /></td>
                ))}
              </tr>
              <tr>
                <td><strong>Kidney Function Test (KFT - 9)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}><Check size={20} color="#059669" /></td>
                ))}
              </tr>
              <tr>
                <td><strong>Lipid Profile (Heart Care)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}><Check size={20} color="#059669" /></td>
                ))}
              </tr>
              <tr>
                <td><strong>Thyroid Profile (T3, T4, TSH)</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>
                    {pkg.parametersCount >= 84 ? <Check size={20} color="#059669" /> : 'TSH Only'}
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Vitamin D & Vitamin B12</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>
                    {pkg.parametersCount >= 84 ? <Check size={20} color="#059669" /> : <Minus size={20} color="#94A3B8" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Iron & Ferritin Deficiency</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>
                    {pkg.parametersCount >= 84 ? <Check size={20} color="#059669" /> : <Minus size={20} color="#94A3B8" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Apolipoprotein Heart Risk</strong></td>
                {comparedPackages.map(pkg => (
                  <td key={pkg.id} style={{ textAlign: 'center' }}>
                    {pkg.parametersCount >= 92 ? <Check size={20} color="#059669" /> : <Minus size={20} color="#94A3B8" />}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
