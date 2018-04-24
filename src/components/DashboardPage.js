// ==============================================
// DASHBOARD PAGE COMPONENT =====================
// ==============================================
import React from 'react';
import TransactionList from './TransactionList';
import TransactionsSummary from './TransactionsSummary';
import TransactionListFilters from './TransactionListFilters';

const DashboardPage = () => (
    <div>
        <TransactionsSummary />
        <TransactionListFilters />
        <TransactionList />
    </div>
);

export default DashboardPage;
