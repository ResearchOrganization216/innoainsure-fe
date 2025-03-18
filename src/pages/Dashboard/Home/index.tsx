import { FC, useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Chart } from "primereact/chart";

const Home: FC = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Premiums",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Claims",
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="m-6 max-w-7xl mx-auto px-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Insurance Overview
          </h1>
          <p className="text-gray-500">Welcome back</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: "Active Policies",
            value: "2,845",
            icon: PrimeIcons.SHIELD,
            trend: "+12.5%",
            color: "bg-blue-500/20 text-blue-600 p-1 rounded-lg",
          },
          {
            title: "Pending Claims",
            value: "147",
            icon: PrimeIcons.EXCLAMATION_CIRCLE,
            trend: "3 new",
            color: "bg-orange-500/20 text-orange-600 p-1 rounded-lg",
          },
          {
            title: "Renewals Due",
            value: "324",
            icon: PrimeIcons.CLOCK,
            trend: "30 days",
            color: "bg-purple-500/20 text-purple-600 p-1 rounded-lg",
          },
          {
            title: "Total Premium",
            value: "$1.2M",
            icon: PrimeIcons.CHART_BAR,
            trend: "+8.4%",
            color: "bg-teal-500/20 text-teal-600 p-1 rounded-lg",
          },
        ].map((card, index) => (
          <Card
            key={index}
            className="shadow-md border-2 rounded-2xl border-blue-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-3">
                <span className="block text-sm font-medium text-gray-500">
                  {card.title}
                </span>
                <span className="block text-3xl font-bold">{card.value}</span>
                <Tag
                  value={card.trend}
                  className={`text-xs ${card.color} border-0`}
                />
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                <i className={`${card.icon} text-2xl`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Quick Actions Panel */}
        <Chart type="bar" data={chartData} options={chartOptions} />

        {/* Recent Activity Panel */}
        <Card className="!rounded-xl backdrop-blur-lg bg-white/70 shadow-sm">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
              <Button
                icon={PrimeIcons.ELLIPSIS_V}
                className="bg-purple-300 rounded-xl border-purple-500"
              />
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "New Policy Issued",
                  details: "Honda Civic 2022 • #POL-84521",
                  time: "2h ago",
                  color: "bg-blue-100",
                  icon: PrimeIcons.FILE,
                },
                {
                  title: "Claim Approved",
                  details: "Toyota Camry • $2,450",
                  time: "4h ago",
                  color: "bg-orange-100",
                  icon: PrimeIcons.CHECK_CIRCLE,
                },
                {
                  title: "Renewal Reminder",
                  details: "3 policies expiring soon",
                  time: "1d ago",
                  color: "bg-purple-100",
                  icon: PrimeIcons.BELL,
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-md ${activity.color} mr-3`}>
                    <i className={`${activity.icon} text-lg`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-4">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
