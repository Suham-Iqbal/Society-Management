import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { DollarSign, Calendar, TrendingUp, FileText } from 'lucide-react';

export function Maintenance() {
  const currentBill = {
    month: 'November 2025',
    amount: 450,
    dueDate: '2025-11-10',
    status: 'pending',
    breakdown: [
      { item: 'Maintenance Charges', amount: 250 },
      { item: 'Water Charges', amount: 75 },
      { item: 'Security', amount: 100 },
      { item: 'Sinking Fund', amount: 25 },
    ],
  };

  const paymentHistory = [
    { month: 'October 2025', amount: 450, date: '2025-10-08', status: 'paid' },
    { month: 'September 2025', amount: 450, date: '2025-09-07', status: 'paid' },
    { month: 'August 2025', amount: 450, date: '2025-08-09', status: 'paid' },
    { month: 'July 2025', amount: 450, date: '2025-07-08', status: 'paid' },
  ];

  const yearlyProgress = {
    paid: 4500,
    total: 5400,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900">Maintenance Management</h2>
        <p className="text-slate-600">Track and pay your maintenance fees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-orange-900">Current Bill - {currentBill.month}</CardTitle>
                  <CardDescription className="text-orange-700">Due by {currentBill.dueDate}</CardDescription>
                </div>
                <Badge variant="destructive">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <DollarSign className="w-6 h-6 text-orange-600" />
                <span className="text-orange-900">${currentBill.amount}</span>
              </div>
              <div className="space-y-2">
                {currentBill.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-orange-800">{item.item}</span>
                    <span className="text-orange-900">${item.amount}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex gap-3">
                <Button className="flex-1">Pay Now</Button>
                <Button variant="outline">Download Invoice</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your past maintenance payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">{payment.month}</p>
                        <p className="text-sm text-slate-500">Paid on {payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-900">${payment.amount}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Overview</CardTitle>
              <CardDescription>2025 Payment Status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm text-slate-900">
                    {Math.round((yearlyProgress.paid / yearlyProgress.total) * 100)}%
                  </span>
                </div>
                <Progress value={(yearlyProgress.paid / yearlyProgress.total) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Paid</span>
                  <span className="text-slate-900">${yearlyProgress.paid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Annual</span>
                  <span className="text-slate-900">${yearlyProgress.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Remaining</span>
                  <span className="text-slate-900">${yearlyProgress.total - yearlyProgress.paid}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Last Payment</p>
                  <p className="text-slate-900">Oct 8, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Payment Streak</p>
                  <p className="text-slate-900">12 months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
