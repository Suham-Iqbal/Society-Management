import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import {
  CreditCard,
  Wallet,
  Smartphone,
  Calendar,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function OnlinePayment() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'easypaisa' | 'jazzcash'>('card');
  const [autoReminder, setAutoReminder] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);

  const paymentHistory = [
    {
      id: 'PAY-2025-001',
      type: 'Maintenance Fee',
      amount: 5000,
      date: '2025-11-01',
      status: 'paid',
      method: 'Credit Card',
    },
    {
      id: 'PAY-2025-002',
      type: 'Utility Bill',
      amount: 3500,
      date: '2025-10-28',
      status: 'paid',
      method: 'UPI',
    },
    {
      id: 'PAY-2025-003',
      type: 'Amenity Booking',
      amount: 1200,
      date: '2025-10-25',
      status: 'paid',
      method: 'Wallet',
    },
    {
      id: 'PAY-2025-004',
      type: 'Parking Fee',
      amount: 2000,
      date: '2025-10-15',
      status: 'paid',
      method: 'Credit Card',
    },
  ];

  const upcomingBills = [
    {
      id: 'BILL-001',
      type: 'Maintenance Fee',
      amount: 5000,
      dueDate: '2025-12-01',
      status: 'upcoming',
    },
    {
      id: 'BILL-002',
      type: 'Utility Bill',
      amount: 3800,
      dueDate: '2025-11-28',
      status: 'due',
    },
  ];

  const handlePayment = () => {
    toast.success('Payment processed successfully!');
    setShowReceipt(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</Badge>;
      case 'due':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Due</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900 dark:text-white">Online Payments</h2>
        <p className="text-slate-600 dark:text-slate-300">Manage your bills and payments</p>
      </div>

      {/* Upcoming Bills */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Upcoming Bills</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Bills that need your attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingBills.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-slate-900 dark:text-white">{bill.type}</h4>
                  {getStatusBadge(bill.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span>{bill.id}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Due: {bill.dueDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-900 dark:text-white">PKR {bill.amount.toLocaleString()}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-slate-900 dark:border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">Make Payment</DialogTitle>
                      <DialogDescription className="dark:text-slate-400">
                        Complete your payment for {bill.type}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Payment Method Selection */}
                      <div className="space-y-3">
                        <Label className="dark:text-slate-200">Payment Method</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              paymentMethod === 'card'
                                ? 'border-green-600 bg-green-50 dark:bg-green-950/30'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-green-600 dark:text-green-500' : 'text-slate-400'}`} />
                            <span className="text-sm font-medium dark:text-white">Card</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('easypaisa')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              paymentMethod === 'easypaisa'
                                ? 'border-green-600 bg-green-50 dark:bg-green-950/30'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <Smartphone className={`w-6 h-6 ${paymentMethod === 'easypaisa' ? 'text-green-600 dark:text-green-500' : 'text-slate-400'}`} />
                            <span className="text-sm font-medium dark:text-white">EasyPaisa</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('jazzcash')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              paymentMethod === 'jazzcash'
                                ? 'border-green-600 bg-green-50 dark:bg-green-950/30'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <Wallet className={`w-6 h-6 ${paymentMethod === 'jazzcash' ? 'text-green-600 dark:text-green-500' : 'text-slate-400'}`} />
                            <span className="text-sm font-medium dark:text-white">JazzCash</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Payment Form */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="dark:text-slate-200">Card Number</Label>
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="dark:text-slate-200">Expiry Date</Label>
                              <Input 
                                placeholder="MM/YY" 
                                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="dark:text-slate-200">CVV</Label>
                              <Input 
                                placeholder="123" 
                                type="password" 
                                maxLength={3}
                                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="dark:text-slate-200">Cardholder Name</Label>
                            <Input 
                              placeholder="Ahmed Khan" 
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                            />
                          </div>
                        </div>
                      )}

                      {/* UPI Payment Form */}
                      {paymentMethod === 'easypaisa' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="dark:text-slate-200">UPI ID</Label>
                            <Input 
                              placeholder="yourname@upi" 
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                            />
                          </div>
                        </div>
                      )}

                      {/* Wallet Payment Form */}
                      {paymentMethod === 'jazzcash' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="dark:text-slate-200">Select Wallet</Label>
                            <Select>
                              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                <SelectValue placeholder="Choose wallet" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                <SelectItem value="easypaisa" className="dark:text-white">EasyPaisa</SelectItem>
                                <SelectItem value="jazzcash" className="dark:text-white">JazzCash</SelectItem>
                                <SelectItem value="nayapay" className="dark:text-white">NayaPay</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="dark:text-slate-200">Phone Number</Label>
                            <Input 
                              placeholder="+92 300 1234567" 
                              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                            />
                          </div>
                        </div>
                      )}

                      {/* Payment Summary */}
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Bill Amount</span>
                          <span className="text-slate-900 dark:text-white">PKR {bill.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Processing Fee</span>
                          <span className="text-slate-900 dark:text-white">PKR 0</span>
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium dark:text-white">Total Amount</span>
                            <span className="font-medium text-green-600 dark:text-green-400">PKR {bill.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handlePayment} 
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Payment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Auto Reminder Setting */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white">Auto Payment Reminders</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get notified before bills are due</p>
              </div>
            </div>
            <Checkbox 
              checked={autoReminder} 
              onCheckedChange={(checked) => setAutoReminder(checked as boolean)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Payment History</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h4 className="text-slate-900 dark:text-white mb-1">{payment.type}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{payment.id}</span>
                  <span>•</span>
                  <span>{payment.date}</span>
                  <span>•</span>
                  <span className="capitalize">{payment.method}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-slate-900 dark:text-white mb-1">PKR {payment.amount.toLocaleString()}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-transparent"
                >
                  <Download className="w-3 h-3 mr-1" />
                  <span className="text-xs">Receipt</span>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}