// ==============================================
// DASHBOARD PAGE COMPONENT =====================
// ==============================================
import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';

const DashboardPage = () => (
    <div>
        <TransactionListFilters />
        <TransactionList />
    </div>
);

export default DashboardPage;
