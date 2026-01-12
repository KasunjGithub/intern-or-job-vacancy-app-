import { useMemo } from "react";
import { BarChart3, TrendingUp, Users, Briefcase, GraduationCap, Eye, Target } from "lucide-react";

export default function Analytics() {
  // Mock analytics data - in real app this would come from API
  const analyticsData = useMemo(() => {
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    
    // Count applications by type
    const internshipApps = applications.filter(app => app.jobType === "internship");
    const jobApps = applications.filter(app => app.jobType === "job");
    
    // Count by categories
    const internshipTypes = {};
    const jobTypes = {};
    
    internshipApps.forEach(app => {
      const type = app.jobTitle || "Other";
      internshipTypes[type] = (internshipTypes[type] || 0) + 1;
    });
    
    jobApps.forEach(app => {
      const type = app.jobTitle || "Other";
      jobTypes[type] = (jobTypes[type] || 0) + 1;
    });
    
    return {
      totalApplications: applications.length,
      internshipApplications: internshipApps.length,
      jobApplications: jobApps.length,
      internshipTypes,
      jobTypes
    };
  }, []);

  const DonutChart = ({ data, title, centerValue, centerLabel }) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
      return (
        <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold text-white/70 mb-4">{title}</h3>
          <div className="flex items-center justify-center h-32">
            <p className="text-white/50 text-sm">No data</p>
          </div>
        </div>
      );
    }

    const colors = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#6366f1"];
    let currentAngle = 0;
    const radius = 45;
    const innerRadius = 30;
    const centerX = 60;
    const centerY = 60;

    return (
      <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
        <h3 className="text-sm font-semibold text-white/70 mb-4">{title}</h3>
        
        <div className="flex items-center gap-4">
          {/* Donut Chart */}
          <div className="relative">
            <svg width="120" height="120">
              {Object.entries(data).map(([key, value], index) => {
                const percentage = (value / total) * 100;
                const angle = (percentage / 100) * 360;
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const startXOuter = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
                const startYOuter = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
                const endXOuter = centerX + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                const endYOuter = centerY + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                
                const startXInner = centerX + innerRadius * Math.cos((currentAngle * Math.PI) / 180);
                const startYInner = centerY + innerRadius * Math.sin((currentAngle * Math.PI) / 180);
                const endXInner = centerX + innerRadius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                const endYInner = centerY + innerRadius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                
                const pathData = [
                  `M ${startXOuter} ${startYOuter}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
                  `L ${endXInner} ${endYInner}`,
                  `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
                  'Z'
                ].join(' ');
                
                currentAngle += angle;
                
                return (
                  <path
                    key={key}
                    d={pathData}
                    fill={colors[index % colors.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                );
              })}
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-white">{centerValue}</div>
              <div className="text-xs text-white/70">{centerLabel}</div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-1 flex-1">
            {Object.entries(data).slice(0, 4).map(([key, value], index) => {
              const percentage = ((value / total) * 100).toFixed(0);
              return (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs truncate">{key}</div>
                    <div className="text-white/50 text-xs">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ title, value, icon: Icon, color = "cyan" }) => {
    const colorClasses = {
      cyan: "text-cyan-300 bg-cyan-500/20",
      amber: "text-amber-300 bg-amber-500/20",
      green: "text-green-300 bg-green-500/20",
      purple: "text-purple-300 bg-purple-500/20"
    };

    return (
      <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white/70">{title}</h3>
          <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
            <Icon size={16} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    );
  };

  const CircularProgress = ({ percentage, value, label, color = "#06b6d4" }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
        <h3 className="text-sm font-semibold text-white/70 mb-4">{label}</h3>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="80" height="80" className="transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke={color}
                strokeWidth="6"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-white">{value}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-white/70 text-sm">Application insights and trends</p>
        </div>
        <div className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-lg">
          Last 30 days
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        <MetricCard
          title="Total Applications"
          value={analyticsData.totalApplications}
          icon={Users}
          color="cyan"
        />
        
        <MetricCard
          title="Internships"
          value={analyticsData.internshipApplications}
          icon={GraduationCap}
          color="purple"
        />
        
        <MetricCard
          title="Job Applications"
          value={analyticsData.jobApplications}
          icon={Briefcase}
          color="amber"
        />
        
        <MetricCard
          title="Success Rate"
          value="78%"
          icon={Target}
          color="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DonutChart
          data={analyticsData.internshipTypes}
          title="Internship Categories"
          centerValue={analyticsData.internshipApplications}
          centerLabel="Total"
        />
        
        <DonutChart
          data={analyticsData.jobTypes}
          title="Job Categories"
          centerValue={analyticsData.jobApplications}
          centerLabel="Total"
        />
        
        <CircularProgress
          percentage={65}
          value="65%"
          label="Application Rate"
          color="#10b981"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold text-white/70 mb-2">Top Category</h3>
          <div className="text-xl font-bold text-white">
            {Object.entries({...analyticsData.internshipTypes, ...analyticsData.jobTypes})
              .sort(([,a], [,b]) => b - a)[0]?.[0] || "No data"}
          </div>
          <div className="text-xs text-white/50 mt-1">Most applied category</div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold text-white/70 mb-2">Growth</h3>
          <div className="text-xl font-bold text-green-300">+24%</div>
          <div className="text-xs text-white/50 mt-1">vs last month</div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold text-white/70 mb-2">Active Users</h3>
          <div className="text-xl font-bold text-white">1,247</div>
          <div className="text-xs text-white/50 mt-1">Monthly active</div>
        </div>
      </div>
    </div>
  );
}