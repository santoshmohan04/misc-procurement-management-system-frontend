# Codebase Overview – Procurement Management System Frontend

## Repository Overview

**Procurement Management System – Frontend**

A React-based single-page application (SPA) for managing the procurement lifecycle in the construction industry. It covers purchase ordering, order approvals, supplier management, delivery advice, payments, and user/role administration.

---

## Key Technologies

| Technology | Version | Role |
|---|---|---|
| **React 18** | 18.2 | UI framework (functional components + hooks) |
| **Vite** | 3.x | Build tool and dev server |
| **React Router v6** | 6.3 | Client-side routing |
| **Redux Toolkit** | 1.8 | Global state management |
| **Axios** | 0.27 | HTTP client for API calls |
| **Tailwind CSS** | 3.x | Utility-first styling (primary) |
| **Bootstrap / MDB / Reactstrap** | 5.x / 4.x / 9.x | Component styling (mixed usage) |
| **MUI (Material UI)** | 5.x + v4 legacy | Some data tables and icons |
| **SweetAlert2** | 11.x | User feedback dialogs |
| **Firebase** | 9.x | Cloud file storage (images) |
| **ESLint + Prettier + Husky** | — | Code quality, formatting, pre-commit hooks |

---

## Codebase Structure

```
src/
├── App.jsx              # Root component — all routes declared here
├── main.jsx             # Entry point, wraps app in Redux <Provider>
├── firebase.js          # Firebase app + Storage initialization
├── index.css            # Global styles
│
├── api/                 # All HTTP request functions (organized by domain)
│   ├── apiInstance.js   # Axios instance — sets baseURL (localhost:5000) & JWT header
│   ├── Order/           # order.request.js  — CRUD for purchase orders
│   ├── Supplier/        # supplier.request.js
│   ├── User/            # user.request.js — auth + user CRUD
│   ├── payment/         # payment.request.js
│   ├── product/         # product.request.js
│   └── delivaryadvice/  # delivery.request.js (note the typo in folder name)
│
├── store/               # Redux store
│   ├── index.js         # configureStore — single reducer: "user"
│   └── User/index.js    # userSlice: user profile + isLoggedIn state
│
├── hooks/
│   └── useFetchUserProfile.js  # Custom hook: validates token → populates Redux store
│
├── utils/
│   └── helper.js        # getUserDetails() — fetches /me, shows error dialog if failed
│
├── constants/
│   └── index.js         # Role constants: PROCUREMENTSTAFF, SITEMANAGER, SUPPLIER, ADMIN
│
├── components/          # Shared/layout components
│   ├── Header.jsx        # Top nav — role-based navigation items + logout
│   ├── Sidebar.jsx       # Site Manager sidebar
│   ├── AdminSidebar.jsx  # Admin sidebar
│   ├── AccountSidebar.jsx  # Procurement Staff sidebar
│   ├── SupplierSidebar.jsx # Supplier sidebar
│   ├── Footer.jsx
│   ├── Modal.jsx
│   └── models/           # Inline modal forms (CRUD dialogs)
│       ├── AddDeliveryAdvice.jsx
│       ├── UpdateDeliveryAdvice.jsx
│       ├── UpdateDeliveryStatus.jsx
│       ├── UpdateOrderRequest.jsx
│       ├── UpdateProduct.jsx
│       ├── UpdateStatus.jsx
│       └── updateUser.jsx
│
└── pages/               # One component per route/screen
```

---

## User Roles & Role-Based Navigation

There are 4 roles defined in `constants/index.js`. The Header and Login page both perform role-based routing:

| Role | Default Landing Page | Nav Items Visible |
|---|---|---|
| `SITEMANAGER` | `/order` | Purchase Order |
| `PROCUREMENTSTAFF` | `/request` | Approvals |
| `SUPPLIER` | `/deliveryStatus` | Delivery |
| `ADMIN` | `/users` | User Management |
| All | — | Home, About Us, Terms & Conditions |

---

## APIs Consumed (Backend at `http://localhost:5000`)

All calls go through a single **Axios instance** that injects a JWT token from `localStorage` on every request.

| Domain | Endpoints Used |
|---|---|
| **Auth / User** | `POST /api/user/login`, `GET /api/user/me`, `GET /api/user/`, `POST /api/user/`, `PUT /api/user/:id`, `DELETE /api/user/:id` |
| **Orders** | `POST /api/orderNew/`, `GET /api/orderNew/`, `GET /api/orderNew/manager/`, `GET /api/orderNew/supplier/`, `GET /api/orderNew/single/:id`, `PUT /api/orderNew/:id`, `DELETE /api/orderNew/:id` |
| **Suppliers** | `POST /api/supplier/`, `GET /api/supplier/` |
| **Products** | `POST /api/product/`, `GET /api/product/`, `GET /api/product/supplier`, `PUT /api/product/:id`, `DELETE /api/product/:id` |
| **Delivery Advice** | `POST /api/deliveryAdvice/`, `GET /api/deliveryAdvice/`, `GET /api/deliveryAdvice/supplier/`, `GET /api/deliveryAdvice/manager`, `PUT /api/deliveryAdvice/:id`, `DELETE /api/deliveryAdvice/:id` |
| **Payments** | `POST /api/payment/`, `GET /api/payment/`, `GET /api/payment/manager`, `PUT /api/payment/:id`, `DELETE /api/payment/:id` |

---

## Pages & Features

| Route | Page | Who Uses It | What It Does |
|---|---|---|---|
| `/` | Login | All | JWT auth, role-based redirect after login |
| `/register` | Register | All | Create a new account |
| `/home` | Home | All | Landing/dashboard page |
| `/about` | AboutUs | All | Static about page |
| `/term` | Terms | All | Static terms & conditions |
| `/order` | PurchaseOrder | Site Manager | Create a new purchase order (order type, item, qty, supplier, date) |
| `/orderRequest` | PlacedOrderRequest | Site Manager | View own placed order requests |
| `/purchasedOrder` | PurchasedOrder | Site Manager | View purchased/approved orders |
| `/request` | Request | Procurement Staff | View all orders, update approval status |
| `/response` | Response | Procurement Staff | View responses to orders |
| `/deliveryStatus` | UpdateStatus | Supplier | Manage delivery statuses |
| `/deliveryAdvice` | DeliveryAdvice | Supplier | Full CRUD on delivery advice records |
| `/managerAdvice` | DeliveryAdviceManager | Site Manager | View delivery advice |
| `/accountDeliveryAdvice` | ListDeliveryAdvice | Accounts | View all delivery advices |
| `/payment` | Payment | Site Manager / Admin | Calculate totals from delivery advices, settle payment |
| `/paymentHistory` | PaymentHistory | Site Manager | View past payments |
| `/orderAccount` | PurchasedOrderAccount | Accounts | View purchased orders |
| `/supplierOrder` | PurchasedOrderSupplier | Supplier | View orders assigned to the supplier |
| `/adminOrder` | PerchasedOrdersforAdmin | Admin | View all orders |
| `/users` | Users | Admin | List, update, delete users |
| `/addSupplier` | AddSuppliers | Admin | Add a new supplier |
| `/addProduct` | AddProduct | Admin | Add a new product |
| `/Products` | ListProducts | Admin | List, update, delete products |

---

## State Management

Redux Toolkit is used with a **single slice** (`userSlice`):
- Stores: `user` object (id, name, NIC, email, mobile, department, role, siteName) and `isLoggedIn` boolean.
- The `useFetchUserProfile` custom hook is called by every page to rehydrate state from the JWT on page refresh.
- JWT is stored in and read from `localStorage`.

---

## UX/UI Context

- **Layout pattern**: Fixed top `Header` + fixed left `Sidebar` (role-specific) + scrollable main content area offset with `md:ml-64 pt-14`.
- **Styling approach**: Mixed — Tailwind CSS is the primary style system; Bootstrap utility classes are also sprinkled in via `class=` (not `className=`), causing minor React linting warnings.
- **Feedback**: SweetAlert2 modals are used for all success/error/confirm dialogs.
- **Background images**: Pages use a full-bleed cover image (`supply.jpg`) behind the content cards.
- **Tables**: Plain HTML tables styled with Tailwind — no pagination library is actually wired up despite `react-bootstrap-table2-paginator` being a dependency.
- **Modals**: Inline modal components (in `src/components/models/`) are used for update/edit forms within table rows.
- **Mobile nav**: Header includes a hamburger toggle with slide-down animation for mobile viewports.

---

## Notable Observations

1. **Hard-coded backend URL**: `apiInstance.js` ignores the env variable and hardcodes `http://localhost:5000` — not production-ready.
2. **Firebase credentials in source**: `firebase.js` contains a live API key/project config checked into the repo.
3. **Mixed `class` vs `className`**: Many JSX files use `class=` (HTML attribute) instead of `className=` (React prop), which is technically wrong but browsers tolerate it.
4. **Typo in folder name**: `src/api/delivaryadvice/` (should be `deliveryadvice`).
5. **Unused packages**: Several large dependencies (`react-jsx-highcharts`, `material-table`, `mdb-react-ui-kit`, `react-images-upload`) appear to be installed but not actively used.
