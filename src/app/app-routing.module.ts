import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';



const routes: Routes = [
  { path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'pages', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'misc', loadChildren: () => import('./misc/misc.module').then(m => m.MiscModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'sub-categories', loadChildren: () => import('./sub-categories/sub-categories.module').then(m => m.SubCategoriesModule) },
  { path: 'pending-orders', loadChildren: () => import('./pending-orders/pending-orders.module').then(m => m.PendingOrdersModule) },
  { path: 'shipped-orders', loadChildren: () => import('./shipped-orders/shipped-orders.module').then(m => m.ShippedOrdersModule) },
  { path: 'completed-orders', loadChildren: () => import('./completed-orders/completed-orders.module').then(m => m.CompletedOrdersModule) },
  { path: 'coupan-code', loadChildren: () => import('./coupan-code/coupan-code.module').then(m => m.CoupanCodeModule) },

  //  { path: 'add-product-variant', component: AddProductVariantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }