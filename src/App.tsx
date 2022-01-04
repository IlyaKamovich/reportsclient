import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketingReportViews } from 'components/Reports/MarketingInterface/models';
import { MarketingInterface } from 'components/Reports/MarketingInterface';
import { Home } from 'routes/Home';
import moment from 'moment';
import 'moment/locale/ru';

import './index.css';

moment.locale('ru');

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="marketing/sources" element={<MarketingInterface statisticsBy={MarketingReportViews.bySources} />} />
      <Route path="marketing/targetologs" element={<MarketingInterface statisticsBy={MarketingReportViews.byTargetologs} />} />
    </Routes>
  </BrowserRouter>
);

export default App;
