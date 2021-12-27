import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IMarketingInterface } from 'components/Reports/MakrketingInterface/models';
import { MarketingInterface } from 'components/Reports/MakrketingInterface';
import { Home } from 'routes/Home';
import moment from 'moment';
import 'moment/locale/ru';

import './index.css';

moment.locale('ru');

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="marketing/sources" element={<MarketingInterface statisticsBy={IMarketingInterface.bySources} />} />
      <Route path="marketing/targetologs" element={<MarketingInterface statisticsBy={IMarketingInterface.byTargetologs} />} />
    </Routes>
  </BrowserRouter>
);

export default App;
