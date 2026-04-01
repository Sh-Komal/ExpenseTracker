import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import {IoMdCard} from "react-icons/io"
import {LuHandCoins, LuWalletMinimal} from "react-icons/lu"
import { addThausandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import { useNavigate } from 'react-router-dom';
import FinanceOverView from '../../components/Dashboard/FinanceOverView';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomewithChart from '../../components/Dashboard/RecentIncomewithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';


const Home = () => {
  useUserAuth();

  const [dashboardData, setDashBoardData] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDashBoardData = async() => {
    if(loading) return

    setLoading(true)
    try{
      const response = await axiosInstance(API_PATHS.DASHBOARD.GET_DATA);
      if(response.data){
        setDashBoardData(response.data)
      }
    }catch(err){
      console.lof("Somthing went wromg", err)
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashBoardData();
  },[])
  return (
   <DashboardLayout activeMenu='Dashboard'>
    <div className='my-5 mx-auto'>
     <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
      <InfoCard icon={<IoMdCard/>} 
      lable="Total Balance" 
      value={addThausandsSeparator(dashboardData?.totalBalance || 0)}
      color="bg-primary"
      />

       <InfoCard icon={<LuWalletMinimal/>} 
      lable="Total Income" 
      value={addThausandsSeparator(dashboardData?.totalIncome || 0)}
      color=" bg-orange-500"
      />

      
       <InfoCard icon={<LuHandCoins/>} 
      lable="Total Expense" 
      value={addThausandsSeparator(dashboardData?.totalExpense || 0)}
      color=" bg-red-500"
      />
     </div>

     <div className=' grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
      <RecentTransactions
      transactions={dashboardData?.recentTransactions}
      onSeeMore={() => navigate("/expense")}
      />

      <FinanceOverView
      totalBalance={dashboardData?.totalBalance || 0}
      totalIncome={dashboardData?.totalIncome || 0}
      totalExpense={dashboardData?.totalExpenses || 0}
      />

      <ExpenseTransaction
        transactions={dashboardData?.last30DaysExpense?.transactions}
        onSeeMore={() => navigate('/expense')}
      />

      
   

   <Last30DaysExpenses data={dashboardData?.last30DaysExpense?.transactions || []}/>


      <RecentIncomewithChart data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
      totalIncome={dashboardData?.totalIncome || 0}
      />

      <RecentIncome transactions={dashboardData?.last60DaysIncome?.transactions|| []}
      onSeeMore={() => navigate('/income')}/>
     </div>
    </div>
   </DashboardLayout>
  )
}

export default Home