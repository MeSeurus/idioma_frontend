import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import BuyElectricsComponent from './components/recipe/BuyElectricsComponent';
import HeaderComponent from './components/common/HeaderComponent';
import FooterComponent from './components/common/FooterComponent';
import CreateBuyElectricsComponent from './components/creates/CreateBuyElectricsComponent';
import PurchaseBuyElectricsComponent from './components/buy/PurchaseBuyElectricsComponent';
import CreateBuyPlasmaComponent from './components/creates/CreateBuyPlasmaComponent';
import BuyPlasmaComponent from './components/recipe/BuyPlasmaComponent';
import PurchaseBuyPlasmaComponent from './components/buy/PurchaseBuyPlasmaComponent';
import BuyHardwareComponent from './components/recipe/BuyHardwareComponent';
import CreateBuyHardwareComponent from './components/creates/CreateBuyHardwareComponent';
import PurchaseBuyHardwareComponent from './components/buy/PurchaseBuyHardwareComponent';
import BuyCabinOtherComponent from './components/recipe/BuyCabinOtherComponent';
import CreateBuyCabinOtherComponent from './components/creates/CreateBuyCabinOtherComponent';
import PurchaseBuyCabinOtherComponent from './components/buy/PurchaseBuyCabinOtherComponent';
import BuyImportPartsComponent from './components/recipe/BuyImportPartsComponent';
import CreateBuyImportPartsComponent from './components/creates/CreateBuyImportPartsComponent';
import PurchaseBuyImportPartsComponent from './components/buy/PurchaseBuyImportPartsComponent';
import BuyMetalSaezComponent from './components/recipe/BuyMetalSaezComponent';
import CreateBuyMetalSaezComponent from './components/creates/CreateBuyMetalSaezComponent';
import PurchaseBuyMetalSaezComponent from './components/buy/PurchaseBuyMetalSaezComponent';
import BuyMetalRusComponent from './components/recipe/BuyMetalRusComponent';
import CreateBuyMetalRusComponent from './components/creates/CreateBuyMetalRusComponent';
import PurchaseBuyMetalRusComponent from './components/buy/PurchaseBuyMetalRusComponent';
import BuyMetalImportComponent from './components/recipe/BuyMetalImportComponent';
import CreateBuyMetalImportComponent from './components/creates/CreateBuyMetalImportComponent';
import PurchaseBuyMetalImportComponent from './components/buy/PurchaseBuyMetalImportComponent';
import PurchaseBuyConsumablesComponent from './components/buy/PurchaseBuyConsumablesComponent';
import CreateBuyConsumablesComponent from './components/creates/CreateBuyConsumablesComponent';
import BuyConsumablesComponent from './components/recipe/BuyConsumablesComponent';
import MainPage from './components/common/MainPage';
import StockCabinOther from './components/stock/StockCabinOther';
import InfoStockCabinOther from './components/info/InfoStockCabinOther';
import StockConsumables from './components/stock/StockConsumables';
import InfoStockConsumables from './components/info/InfoStockConsumables';
import StockElectrics from './components/stock/StockElectrics';
import InfoStockElectrics from './components/info/InfoStockElectrics';
import StockImportParts from './components/stock/StockImportParts';
import InfoStockImportParts from './components/info/InfoStockImportParts';
import StockHardware from './components/stock/StockHardware';
import InfoStockHardware from './components/info/InfoStockHardware';
import StockPlasma from './components/stock/StockPlasma';
import InfoStockPlasma from './components/info/InfoStockPlasma';
import StockMetalImport from './components/stock/StockMetalImport';
import InfoStockMetalImport from './components/info/InfoStockMetalImport';
import StockMetalRus from './components/stock/StockMetalRus';
import InfoStockMetalRus from './components/info/InfoStockMetalRus';
import StockMetalSaez from './components/stock/StockMetalSaez';
import InfoStockMetalSaez from './components/info/InfoStockMetalSaez';
import LeftoversStock from './components/leftover/LeftoversStock'
import SendToLeftoversMetalRus from './components/leftover/SendToLeftoversMetalRus';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Routes>

            {/*Главная страница*/}
            <Route path="/" exact element={<MainPage />}></Route>

            {/*Таблицы 'рецептов' закупок*/}
            <Route path="/buy_electrics" element={<BuyElectricsComponent />}></Route>
            <Route path="/buy_plasma" element={<BuyPlasmaComponent />}></Route>
            <Route path="/buy_hardware" element={<BuyHardwareComponent />}></Route>
            <Route path="/buy_cabin_other" element={<BuyCabinOtherComponent />}></Route>
            <Route path="/buy_import_parts" element={<BuyImportPartsComponent />}></Route>
            <Route path="/buy_metal_saez" element={<BuyMetalSaezComponent />}></Route>
            <Route path="/buy_metal_rus" element={<BuyMetalRusComponent />}></Route>
            <Route path="/buy_metal_import" element={<BuyMetalImportComponent />}></Route>
            <Route path="/buy_consumables" element={<BuyConsumablesComponent />}></Route>
            {/*Редактирование по id*/}
            <Route path="/add_electrics_recipe/:id" element={<CreateBuyElectricsComponent />}></Route>
            <Route path="/add_plasma_recipe/:id" element={<CreateBuyPlasmaComponent />}></Route>
            <Route path="/add_hardware_recipe/:id" element={<CreateBuyHardwareComponent />}></Route>
            <Route path="/add_cabin_other_recipe/:id" element={<CreateBuyCabinOtherComponent />}></Route>
            <Route path="/add_import_parts_recipe/:id" element={<CreateBuyImportPartsComponent />}></Route>
            <Route path="/add_metal_saez_recipe/:id" element={<CreateBuyMetalSaezComponent />}></Route>
            <Route path="/add_metal_rus_recipe/:id" element={<CreateBuyMetalRusComponent />}></Route>
            <Route path="/add_metal_import_recipe/:id" element={<CreateBuyMetalImportComponent />}></Route>
            <Route path="/add_consumables_recipe/:id" element={<CreateBuyConsumablesComponent />}></Route>
            {/*Страницы закупок позиции*/}
            <Route path="/purchase_electrics/:id" element={<PurchaseBuyElectricsComponent />}></Route>
            <Route path="/purchase_plasma/:id" element={<PurchaseBuyPlasmaComponent />}></Route>
            <Route path="/purchase_hardware/:id" element={<PurchaseBuyHardwareComponent />}></Route>
            <Route path="/purchase_cabin_other/:id" element={<PurchaseBuyCabinOtherComponent />}></Route>
            <Route path="/purchase_import_parts/:id" element={<PurchaseBuyImportPartsComponent />}></Route>
            <Route path="/purchase_metal_saez/:id" element={<PurchaseBuyMetalSaezComponent />}></Route>
            <Route path="/purchase_metal_rus/:id" element={<PurchaseBuyMetalRusComponent />}></Route>
            <Route path="/purchase_metal_import/:id" element={<PurchaseBuyMetalImportComponent />}></Route>
            <Route path="/purchase_consumables/:id" element={<PurchaseBuyConsumablesComponent />}></Route>
            {/*Таблицы наличия закупок*/}
            <Route path="/stock_cabin_other" element={<StockCabinOther />}></Route>
            <Route path="/stock_consumables" element={<StockConsumables />}></Route>
            <Route path="/stock_electrics" element={<StockElectrics />}></Route>
            <Route path="/stock_import_parts" element={<StockImportParts />}></Route>
            <Route path="/stock_hardware" element={<StockHardware />}></Route>
            <Route path="/stock_plasma" element={<StockPlasma />}></Route>
            <Route path="/stock_metal_import" element={<StockMetalImport />}></Route>
            <Route path="/stock_metal_saez" element={<StockMetalSaez />}></Route>
            <Route path="/stock_metal_rus" element={<StockMetalRus />}></Route>
            {/*Инфо о закупках*/}
            <Route path="/info_stock_cabin_other/:id" element={<InfoStockCabinOther />}></Route>
            <Route path="/info_stock_consumables/:id" element={<InfoStockConsumables />}></Route>
            <Route path="/info_stock_electrics/:id" element={<InfoStockElectrics />}></Route>
            <Route path="/info_stock_import_parts/:id" element={<InfoStockImportParts />}></Route>
            <Route path="/info_stock_hardware/:id" element={<InfoStockHardware />}></Route>
            <Route path="/info_stock_plasma/:id" element={<InfoStockPlasma />}></Route>
            <Route path="/info_stock_metal_import/:id" element={<InfoStockMetalImport />}></Route>
            <Route path="/info_stock_metal_saez/:id" element={<InfoStockMetalSaez />}></Route>
            <Route path="/info_stock_metal_rus/:id" element={<InfoStockMetalRus />}></Route>
            {/*Остатки*/}
            <Route path="leftovers" element={<LeftoversStock />}></Route>
            <Route path="/send_to_leftovers_metal_rus/:id" element={<SendToLeftoversMetalRus />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
