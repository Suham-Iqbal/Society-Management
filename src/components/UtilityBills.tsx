import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DollarSign, Calendar, TrendingUp, FileText, Droplet, Zap, Home } from 'lucide-react';

export function UtilityBills() {
  const maintenanceBill = {
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

  const utilityBills = [
    {
      type: 'Electricity',
      icon: Zap,
      amount: 1250,
      units: 325,
      dueDate: '2025-11-15',
      status: 'pending',
      color: 'bg-yellow-500',
    },
    {
      type: 'Water',
      icon: Droplet,
      amount: 380,
      units: 45,
      dueDate: '2025-11-12',
      status: 'pending',
      color: 'bg-blue-500',
    },
    {
      type: 'Gas',
      icon: Home,
      amount: 520,
      units: 28,
      dueDate: '2025-11-08',
      status: 'paid',
      color: 'bg-orange-500',
    },
  ];

  const paymentHistory = [
    { month: 'October 2025', type: 'Maintenance', amount: 450, date: '2025-10-08', status: 'paid' },
    { month: 'October 2025', type: 'Electricity', amount: 1180, date: '2025-10-15', status: 'paid' },
    { month: 'September 2025', type: 'Maintenance', amount: 450, date: '2025-09-07', status: 'paid' },
    { month: 'September 2025', type: 'Water', amount: 340, date: '2025-09-12', status: 'paid' },
  ];

  const yearlyProgress = {
    paid: 6840,
    total: 8200,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-white">Utility Bills & Payments</h2>
        <p className="text-slate-600 dark:text-slate-300">Manage all your utility bills in one place</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6 mt-6">
          {/* Maintenance Bill */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-orange-900">Society Maintenance - {maintenanceBill.month}</CardTitle>
                  <CardDescription className="text-orange-700">Due by {maintenanceBill.dueDate}</CardDescription>
                </div>
                <Badge variant="destructive">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <DollarSign className="w-6 h-6 text-orange-600" />
                <span className="text-orange-900">${maintenanceBill.amount}</span>
              </div>
              <div className="space-y-2">
                {maintenanceBill.breakdown.map((item, index) => (
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

          {/* Utility Bills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {utilityBills.map((bill, index) => {
              const Icon = bill.icon;
              return (
                <Card key={index} className={bill.status === 'paid' ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-12 h-12 rounded-lg ${bill.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={bill.status === 'paid' ? 'outline' : 'destructive'}>
                        {bill.status}
                      </Badge>
                    </div>
                    <CardTitle>{bill.type}</CardTitle>
                    <CardDescription>Due: {bill.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-slate-900">${bill.amount}</div>
                      <p className="text-sm text-slate-600">{bill.units} units consumed</p>
                    </div>
                    {bill.status === 'pending' && (
                      <Button className="w-full" size="sm">Pay Now</Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Yearly Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Yearly Overview - 2025</CardTitle>
              <CardDescription>Total payments across all utilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Annual Progress</span>
                  <span className="text-sm text-slate-900">
                    {Math.round((yearlyProgress.paid / yearlyProgress.total) * 100)}%
                  </span>
                </div>
                <Progress value={(yearlyProgress.paid / yearlyProgress.total) * 100} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Paid</p>
                  <p className="text-slate-900">${yearlyProgress.paid}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Annual</p>
                  <p className="text-slate-900">${yearlyProgress.total}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Remaining</p>
                  <p className="text-slate-900">${yearlyProgress.total - yearlyProgress.paid}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your past payments across all utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">{payment.type} - {payment.month}</p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}