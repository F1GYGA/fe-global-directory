export const DEPARTMENTS_TEAMS_JOBS: {
  [key: string]: { [key: string]: string[] };
} = {
  'Corporate Bank': {
    'Cash Management': [
      'Cash Manager',
      'Treasury Analyst',
      'Financial Analyst',
    ],
    'Trade Finance': [
      'Trade Finance Manager',
      'Trade Operations Specialist',
      'Trade Analyst',
    ],
    'Corporate Finance': [
      'Corporate Finance Analyst',
      'Finance Manager',
      'Corporate Finance Advisor',
    ],
    'Securities Services': [
      'Securities Analyst',
      'Securities Specialist',
      'Custody Manager',
    ],
  },
  'Investment Bank': {
    'Equity Capital Markets': [
      'Investment Banking Analyst',
      'Equity Research Associate',
      'Equity Trader',
    ],
    'Debt Capital Markets': [
      'Credit Analyst',
      'Debt Capital Markets Analyst',
      'Fixed Income Analyst',
    ],
    'Mergers and Acquisitions': [
      'M&A Analyst',
      'M&A Associate',
      'Investment Banker',
    ],
    'Structured Finance': [
      'Structured Finance Analyst',
      'Structured Finance Associate',
      'Credit Structurer',
    ],
  },
  'Private Bank': {
    'Private Wealth Management': [
      'Wealth Manager',
      'Private Banker',
      'Portfolio Manager',
    ],
    'Private Banking Services': [
      'Relationship Manager',
      'Client Services Associate',
      'Financial Consultant',
    ],
    'Portfolio Management': [
      'Portfolio Manager',
      'Investment Analyst',
      'Risk Manager',
    ],
    'Financial Planning': [
      'Financial Planner',
      'Retirement Specialist',
      'Estate Planner',
    ],
  },
  'Asset Management': {
    'Equity Investments': [
      'Portfolio Manager',
      'Equity Analyst',
      'Equity Trader',
    ],
    'Fixed Income Investments': [
      'Fixed Income Analyst',
      'Fixed Income Portfolio Manager',
      'Bond Trader',
    ],
    'Real Estate Investments': [
      'Real Estate Analyst',
      'Real Estate Portfolio Manager',
      'Real Estate Investment Associate',
    ],
    'Alternative Investments': [
      'Alternative Investment Analyst',
      'Hedge Fund Manager',
      'Private Equity Associate',
    ],
  },
  'Wealth Management': {
    'Investment Advisory': [
      'Investment Advisor',
      'Financial Consultant',
      'Wealth Advisor',
    ],
    'Estate Planning': [
      'Estate Planner',
      'Trust Advisor',
      'Estate Planning Attorney',
    ],
    'Wealth Structuring': [
      'Wealth Structuring Specialist',
      'Tax Advisor',
      'Trust Specialist',
    ],
    'Portfolio Management': [
      'Portfolio Manager',
      'Investment Analyst',
      'Risk Manager',
    ],
  },
  'Global Markets': {
    'Equities Trading': [
      'Equity Trader',
      'Sales Trader',
      'Equity Research Analyst',
    ],
    'Fixed Income Trading': [
      'Fixed Income Trader',
      'Fixed Income Analyst',
      'Sales Trader',
    ],
    'Foreign Exchange Trading': ['FX Trader', 'FX Analyst', 'FX Sales'],
    'Commodities Trading': [
      'Commodities Trader',
      'Commodity Analyst',
      'Commodity Broker',
    ],
  },
  'Global Transaction Banking': {
    'Cash Management': [
      'Cash Manager',
      'Treasury Analyst',
      'Financial Analyst',
    ],
    'Trade Finance': [
      'Trade Finance Manager',
      'Trade Operations Specialist',
      'Trade Analyst',
    ],
    'Securities Services': [
      'Securities Analyst',
      'Securities Specialist',
      'Custody Manager',
    ],
    'Trust & Agency Services': [
      'Trust Officer',
      'Agency Services Associate',
      'Trust Administrator',
    ],
  },
  'Risk Management': {
    'Credit Risk': [
      'Credit Risk Analyst',
      'Credit Manager',
      'Credit Risk Modeler',
    ],
    'Market Risk': [
      'Market Risk Analyst',
      'Market Risk Manager',
      'Quantitative Analyst',
    ],
    'Operational Risk': [
      'Operational Risk Analyst',
      'Operational Risk Manager',
      'Risk Control Specialist',
    ],
    'Liquidity Risk': [
      'Liquidity Risk Analyst',
      'Liquidity Risk Manager',
      'Treasury Analyst',
    ],
  },
  Compliance: {
    'Regulatory Compliance': [
      'Compliance Officer',
      'Regulatory Affairs Manager',
      'Compliance Analyst',
    ],
    'Anti-Money Laundering': [
      'AML Analyst',
      'AML Compliance Officer',
      'Fraud Analyst',
    ],
    'Trade Surveillance': [
      'Trade Surveillance Analyst',
      'Compliance Officer',
      'Trade Monitoring Specialist',
    ],
    'Employee Compliance': [
      'Employee Compliance Manager',
      'Compliance Analyst',
      'Ethics Officer',
    ],
  },
  Legal: {
    'Corporate Governance': [
      'Corporate Governance Analyst',
      'Corporate Governance Specialist',
      'Governance Manager',
    ],
    Litigation: ['Litigation Attorney', 'Legal Counsel', 'Paralegal'],
    Contracts: ['Contracts Manager', 'Legal Analyst', 'Contract Attorney'],
    'Regulatory Affairs': [
      'Regulatory Affairs Manager',
      'Regulatory Compliance Specialist',
      'Legal Counsel',
    ],
  },
  'Human Resources': {
    Recruitment: [
      'Recruiter',
      'Talent Acquisition Specialist',
      'Recruiting Coordinator',
    ],
    'Employee Relations': [
      'Employee Relations Specialist',
      'Human Resources Manager',
      'Employee Relations Manager',
    ],
    'Learning and Development': [
      'Learning and Development Specialist',
      'Training Manager',
      'Learning Consultant',
    ],
    'Compensation and Benefits': [
      'Compensation Analyst',
      'Benefits Administrator',
      'Compensation and Benefits Manager',
    ],
  },
  'Information Technology': {
    'IT Infrastructure': [
      'System Administrator',
      'Network Engineer',
      'IT Support Specialist',
    ],
    'IT Security': [
      'Security Analyst',
      'Information Security Manager',
      'Security Engineer',
    ],
    'Software Development': [
      'Software Engineer',
      'Web Developer',
      'QA Engineer',
    ],
    'Data Management': [
      'Data Analyst',
      'Database Administrator',
      'Data Scientist',
    ],
  },
  Operations: {
    Settlements: [
      'Settlements Analyst',
      'Settlements Manager',
      'Settlements Specialist',
    ],
    Reconciliation: [
      'Reconciliation Analyst',
      'Reconciliation Specialist',
      'Reconciliation Manager',
    ],
    'Client Services': [
      'Client Services Associate',
      'Client Services Manager',
      'Client Relationship Specialist',
    ],
    'Transaction Processing': [
      'Operations Analyst',
      'Transaction Specialist',
      'Transaction Manager',
    ],
  },
  Finance: {
    'Financial Reporting': [
      'Financial Analyst',
      'Financial Reporting Manager',
      'Accountant',
    ],
    Treasury: ['Treasury Analyst', 'Treasury Manager', 'Cash Manager'],
    Tax: ['Tax Analyst', 'Tax Manager', 'Tax Consultant'],
    'Planning and Analysis': [
      'Financial Planner',
      'Financial Analyst',
      'Business Analyst',
    ],
  },
  Audit: {
    'Internal Audit': ['Internal Auditor', 'Audit Manager', 'Audit Analyst'],
    'Financial Audit': [
      'Financial Auditor',
      'Audit Associate',
      'Audit Manager',
    ],
    'Operational Audit': [
      'Operational Auditor',
      'Audit Analyst',
      'Audit Manager',
    ],
    'Compliance Audit': [
      'Compliance Auditor',
      'Audit Analyst',
      'Compliance Manager',
    ],
  },
  'Corporate Communications': {
    'Public Relations': [
      'PR Specialist',
      'PR Manager',
      'Communications Specialist',
    ],
    'Internal Communications': [
      'Internal Communications Specialist',
      'Internal Communications Manager',
      'Editor',
    ],
    'Media Relations': [
      'Media Relations Specialist',
      'Media Relations Manager',
      'PR Specialist',
    ],
    'Corporate Social Responsibility': [
      'CSR Specialist',
      'CSR Manager',
      'Sustainability Manager',
    ],
  },
  'Government & Regulatory Affairs': {
    'Government Relations': [
      'Government Relations Specialist',
      'Government Affairs Manager',
      'Lobbyist',
    ],
    'Regulatory Policy': [
      'Policy Analyst',
      'Regulatory Affairs Specialist',
      'Regulatory Affairs Manager',
    ],
    'Public Affairs': [
      'Public Affairs Specialist',
      'Public Affairs Manager',
      'Communications Specialist',
    ],
    'Regulatory Compliance': [
      'Regulatory Compliance Specialist',
      'Compliance Officer',
      'Regulatory Affairs Manager',
    ],
  },
  Research: {
    'Equity Research': [
      'Equity Research Analyst',
      'Equity Research Associate',
      'Portfolio Manager',
    ],
    'Fixed Income Research': [
      'Fixed Income Analyst',
      'Fixed Income Research Associate',
      'Fixed Income Portfolio Manager',
    ],
    'Economic Research': [
      'Economist',
      'Economic Analyst',
      'Research Associate',
    ],
    'Quantitative Research': [
      'Quantitative Analyst',
      'Quantitative Researcher',
      'Data Scientist',
    ],
  },
  'Strategy and Business Development': {
    'Corporate Strategy': [
      'Strategy Analyst',
      'Strategy Manager',
      'Strategic Planner',
    ],
    'Business Development': [
      'Business Development Specialist',
      'Business Development Manager',
      'Sales Manager',
    ],
    'Market Analysis': [
      'Market Analyst',
      'Research Analyst',
      'Market Research Manager',
    ],
    'Strategic Partnerships': [
      'Partnerships Manager',
      'Business Development Manager',
      'Alliances Manager',
    ],
  },
  'Real Estate Management': {
    'Property Management': [
      'Property Manager',
      'Leasing Consultant',
      'Property Administrator',
    ],
    'Real Estate Investments': [
      'Real Estate Analyst',
      'Real Estate Investment Manager',
      'Real Estate Associate',
    ],
    'Real Estate Development': [
      'Real Estate Developer',
      'Project Manager',
      'Construction Manager',
    ],
    'Facilities Management': [
      'Facilities Manager',
      'Maintenance Supervisor',
      'Facilities Coordinator',
    ],
  },
};
