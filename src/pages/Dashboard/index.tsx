import React, { useState, useEffect } from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatValueSignal from '../../utils/formatValueSignal';
import formatDateTime from '../../utils/formatDateTime';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactionsValue, setTransactions] = useState<Transaction[]>([]);
  const [balanceValue, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      const { transactions, balance } = response.data;

      setTransactions(transactions);
      setBalance(balance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header selected="dashboard" />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={incomeImg} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {formatValue(balanceValue.income)}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcomeImg} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balanceValue.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={totalImg} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {formatValue(balanceValue.total)}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactionsValue.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {formatValueSignal(transaction.value, transaction.type)}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{formatDateTime(transaction.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
