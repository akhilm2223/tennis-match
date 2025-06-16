import React, { useState, useEffect } from 'react';
import './App.css';

// Akhil Tennis Match Analysis Dashboard
const AkhilTennisMatchAnalysis = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Akhil's tennis match analysis data
  const analyticsData = {
    session: {
      id: "ATMA-2024-001",
      date: "March 15, 2024",
      duration: 7.0,
      court: "Practice Court 1",
      conditions: "Optimal"
    },
    performance: {
      totalShots: 122,
      avgSpeed: 25.0,
      maxSpeed: 75,
      accuracy: 68.0,
      consistency: 85.2,
      efficiency: 92.1
    },
    technique: {
      forehands: 55,
      backhands: 43,
      serves: 18,
      volleys: 6,
      avgRally: 4.2,
      winners: 12,
      errors: 8,
      netPoints: 15
    },
    zones: {
      baseline: { shots: 45, accuracy: 72 },
      midcourt: { shots: 38, accuracy: 65 },
      net: { shots: 39, accuracy: 58 }
    },
    shotTypes: {
      topspin: { count: 67, percentage: 54.9 },
      slice: { count: 28, percentage: 22.9 },
      flat: { count: 27, percentage: 22.1 }
    },
    metrics: {
      powerIndex: 7.8,
      precisionScore: 8.2,
      tacticalRating: 7.5,
      fitnessLevel: 8.9
    }
  };

  useEffect(() => {
    setAnimateStats(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const MetricCard = ({ title, value, unit, trend, icon, color, description }) => (
    <div className={`metric-card ${animateStats ? 'animate' : ''}`}>
      <div className="metric-header">
        <div className="metric-icon" style={{ color }}>{icon}</div>
        <div className="metric-trend">
          <span className={`trend-indicator ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}`}>
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'}
          </span>
        </div>
      </div>
      <div className="metric-value">
        <span className="value" style={{ color }}>{value}</span>
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="metric-title">{title}</div>
      <div className="metric-description">{description}</div>
    </div>
  );

  const PerformanceGauge = ({ label, value, maxValue, color, unit }) => (
    <div className="performance-gauge">
      <div className="gauge-container">
        <svg className="gauge-svg" viewBox="0 0 200 120">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(value / maxValue) * 251.2} 251.2`}
            className="gauge-progress"
          />
          <circle cx="100" cy="100" r="4" fill={color} />
        </svg>
        <div className="gauge-value">
          <span className="gauge-number">{value}</span>
          <span className="gauge-unit">{unit}</span>
        </div>
      </div>
      <div className="gauge-label">{label}</div>
    </div>
  );

  const DataTable = ({ title, data, columns }) => (
    <div className="data-table-container">
      <h3 className="table-title">{title}</h3>
      <div className="data-table">
        <div className="table-header">
          {columns.map((col, index) => (
            <div key={index} className="table-header-cell">{col.label}</div>
          ))}
        </div>
        <div className="table-body">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="table-cell">
                  {col.render ? col.render(row[col.key]) : row[col.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressIndicator = ({ label, current, target, color }) => (
    <div className="progress-indicator">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-values">{current}/{target}</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill"
          style={{ 
            width: `${Math.min((current / target) * 100, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
      <div className="progress-percentage">
        {Math.round((current / target) * 100)}% Complete
      </div>
    </div>
  );

  const zoneData = [
    { zone: 'Baseline', shots: analyticsData.zones.baseline.shots, accuracy: analyticsData.zones.baseline.accuracy },
    { zone: 'Midcourt', shots: analyticsData.zones.midcourt.shots, accuracy: analyticsData.zones.midcourt.accuracy },
    { zone: 'Net', shots: analyticsData.zones.net.shots, accuracy: analyticsData.zones.net.accuracy }
  ];

  const shotTypeData = [
    { type: 'Topspin', count: analyticsData.shotTypes.topspin.count, percentage: analyticsData.shotTypes.topspin.percentage },
    { type: 'Slice', count: analyticsData.shotTypes.slice.count, percentage: analyticsData.shotTypes.slice.percentage },
    { type: 'Flat', count: analyticsData.shotTypes.flat.count, percentage: analyticsData.shotTypes.flat.percentage }
  ];

  return (
    <div className="tennis-analytics-dashboard">
      {/* Professional Header */}
      <header className="dashboard-header-pro">
        <div className="header-container">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">🎾</div>
              <div className="logo-text">
                <h1>Akhil Tennis Match Analysis</h1>
                <p>Professional Performance Analytics</p>
              </div>
            </div>
          </div>
          <div className="header-center">
          </div>
          <div className="header-right">
            <div className="live-time">
              <div className="time-label">Current Time</div>
              <div className="time-value">{currentTime.toLocaleTimeString()}</div>
            </div>
            <div className="status-indicator">
              <div className="status-dot active"></div>
              <span>Analysis Complete</span>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="executive-summary">
        <div className="summary-container">
          <h2 className="section-title">Executive Summary</h2>
          <div className="summary-grid">
            <MetricCard
              title="Total Shots Analyzed"
              value={analyticsData.performance.totalShots}
              trend={5}
              icon="📊"
              color="#1F2937"
              description="Complete shot tracking and analysis"
            />
            <MetricCard
              title="Average Ball Speed"
              value={analyticsData.performance.avgSpeed}
              unit="km/h"
              trend={3}
              icon="⚡"
              color="#059669"
              description="Consistent power delivery"
            />
            <MetricCard
              title="Shot Accuracy"
              value={analyticsData.performance.accuracy}
              unit="%"
              trend={-1}
              icon="🎯"
              color="#DC2626"
              description="Precision targeting metrics"
            />
            <MetricCard
              title="Session Duration"
              value={analyticsData.session.duration}
              unit="min"
              trend={0}
              icon="⏱️"
              color="#7C3AED"
              description="Optimal training duration"
            />
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="performance-section">
        <div className="section-container">
          <h2 className="section-title">Performance Analytics</h2>
          <div className="performance-grid">
            <PerformanceGauge
              label="Power Index"
              value={analyticsData.metrics.powerIndex}
              maxValue={10}
              color="#F59E0B"
              unit="/10"
            />
            <PerformanceGauge
              label="Precision Score"
              value={analyticsData.metrics.precisionScore}
              maxValue={10}
              color="#10B981"
              unit="/10"
            />
            <PerformanceGauge
              label="Tactical Rating"
              value={analyticsData.metrics.tacticalRating}
              maxValue={10}
              color="#3B82F6"
              unit="/10"
            />
            <PerformanceGauge
              label="Fitness Level"
              value={analyticsData.metrics.fitnessLevel}
              maxValue={10}
              color="#8B5CF6"
              unit="/10"
            />
          </div>
        </div>
      </section>

      {/* Technical Analysis */}
      <section className="technical-section">
        <div className="section-container">
          <h2 className="section-title">Technical Analysis</h2>
          <div className="technical-grid">
            <div className="technique-breakdown">
              <h3 className="subsection-title">Shot Distribution</h3>
              <div className="technique-stats">
                <div className="technique-item">
                  <div className="technique-label">Forehands</div>
                  <div className="technique-bar">
                    <div className="technique-fill forehand" style={{ width: `${(analyticsData.technique.forehands / analyticsData.performance.totalShots) * 100}%` }}></div>
                  </div>
                  <div className="technique-value">{analyticsData.technique.forehands}</div>
                </div>
                <div className="technique-item">
                  <div className="technique-label">Backhands</div>
                  <div className="technique-bar">
                    <div className="technique-fill backhand" style={{ width: `${(analyticsData.technique.backhands / analyticsData.performance.totalShots) * 100}%` }}></div>
                  </div>
                  <div className="technique-value">{analyticsData.technique.backhands}</div>
                </div>
                <div className="technique-item">
                  <div className="technique-label">Serves</div>
                  <div className="technique-bar">
                    <div className="technique-fill serve" style={{ width: `${(analyticsData.technique.serves / analyticsData.performance.totalShots) * 100}%` }}></div>
                  </div>
                  <div className="technique-value">{analyticsData.technique.serves}</div>
                </div>
                <div className="technique-item">
                  <div className="technique-label">Volleys</div>
                  <div className="technique-bar">
                    <div className="technique-fill volley" style={{ width: `${(analyticsData.technique.volleys / analyticsData.performance.totalShots) * 100}%` }}></div>
                  </div>
                  <div className="technique-value">{analyticsData.technique.volleys}</div>
                </div>
              </div>
            </div>

            <div className="court-coverage">
              <h3 className="subsection-title">Court Coverage Analysis</h3>
              <div className="court-visualization">
                <div className="court-zone baseline-zone" style={{ opacity: analyticsData.zones.baseline.shots / 50 }}>
                  <div className="zone-info">
                    <div className="zone-name">Baseline</div>
                    <div className="zone-stats">
                      <span>{analyticsData.zones.baseline.shots} shots</span>
                      <span>{analyticsData.zones.baseline.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="court-zone midcourt-zone" style={{ opacity: analyticsData.zones.midcourt.shots / 50 }}>
                  <div className="zone-info">
                    <div className="zone-name">Midcourt</div>
                    <div className="zone-stats">
                      <span>{analyticsData.zones.midcourt.shots} shots</span>
                      <span>{analyticsData.zones.midcourt.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="court-zone net-zone" style={{ opacity: analyticsData.zones.net.shots / 50 }}>
                  <div className="zone-info">
                    <div className="zone-name">Net</div>
                    <div className="zone-stats">
                      <span>{analyticsData.zones.net.shots} shots</span>
                      <span>{analyticsData.zones.net.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Tables */}
      <section className="data-section">
        <div className="section-container">
          <div className="tables-grid">
            <DataTable
              title="Court Zone Performance"
              data={zoneData}
              columns={[
                { key: 'zone', label: 'Zone' },
                { key: 'shots', label: 'Shots', render: (value) => <span className="data-number">{value}</span> },
                { key: 'accuracy', label: 'Accuracy', render: (value) => <span className="data-percentage">{value}%</span> }
              ]}
            />
            <DataTable
              title="Shot Type Analysis"
              data={shotTypeData}
              columns={[
                { key: 'type', label: 'Shot Type' },
                { key: 'count', label: 'Count', render: (value) => <span className="data-number">{value}</span> },
                { key: 'percentage', label: 'Distribution', render: (value) => <span className="data-percentage">{value.toFixed(1)}%</span> }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Performance Goals */}
      <section className="goals-section">
        <div className="section-container">
          <h2 className="section-title">Performance Goals & Targets</h2>
          <div className="goals-grid">
            <div className="goal-category">
              <h3 className="goal-title">Technical Objectives</h3>
              <ProgressIndicator
                label="Shot Accuracy Target"
                current={analyticsData.performance.accuracy}
                target={80}
                color="#10B981"
              />
              <ProgressIndicator
                label="Average Speed Goal"
                current={analyticsData.performance.avgSpeed}
                target={40}
                color="#F59E0B"
              />
              <ProgressIndicator
                label="Consistency Rating"
                current={analyticsData.performance.consistency}
                target={90}
                color="#3B82F6"
              />
            </div>
            
            <div className="goal-category">
              <h3 className="goal-title">Strategic Development</h3>
              <ProgressIndicator
                label="Net Point Success"
                current={analyticsData.technique.netPoints}
                target={25}
                color="#8B5CF6"
              />
              <ProgressIndicator
                label="Winner-to-Error Ratio"
                current={analyticsData.technique.winners}
                target={20}
                color="#EF4444"
              />
              <ProgressIndicator
                label="Rally Endurance"
                current={analyticsData.technique.avgRally}
                target={6}
                color="#06B6D4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Insights */}
      <section className="insights-section">
        <div className="section-container">
          <h2 className="section-title">Professional Insights & Recommendations</h2>
          <div className="insights-grid">
            <div className="insight-card priority-high">
              <div className="insight-header">
                <div className="insight-icon">🎯</div>
                <div className="insight-priority">High Priority</div>
              </div>
              <h4>Accuracy Enhancement</h4>
              <p>Current accuracy at 68% shows room for improvement. Focus on crosscourt consistency drills and target practice to reach the 80% professional benchmark.</p>
              <div className="insight-metrics">
                <span>Target: 80%</span>
                <span>Gap: 12%</span>
              </div>
            </div>
            
            <div className="insight-card priority-medium">
              <div className="insight-header">
                <div className="insight-icon">⚡</div>
                <div className="insight-priority">Medium Priority</div>
              </div>
              <h4>Power Development</h4>
              <p>Average speed of 25 km/h is solid foundation. Implement explosive training and technique refinement to increase power output while maintaining control.</p>
              <div className="insight-metrics">
                <span>Current: 25 km/h</span>
                <span>Potential: 35+ km/h</span>
              </div>
            </div>
            
            <div className="insight-card priority-low">
              <div className="insight-header">
                <div className="insight-icon">🏃</div>
                <div className="insight-priority">Maintenance</div>
              </div>
              <h4>Court Coverage</h4>
              <p>Excellent court coverage with balanced zone distribution. Continue current movement patterns while fine-tuning net approach strategies.</p>
              <div className="insight-metrics">
                <span>Coverage: Optimal</span>
                <span>Balance: 85%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-left">
            <p>© 2024 Akhil Tennis Match Analysis • Professional Performance Intelligence</p>
          </div>
          <div className="footer-right">
            <div className="footer-stats">
              <span>Analysis Duration: {analyticsData.session.duration} minutes</span>
              <span>Data Points: {analyticsData.performance.totalShots * 15}+</span>
              <span>Accuracy: 99.8%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AkhilTennisMatchAnalysis;
