<h1 align="center">NLW - Plann.er (in development)</h1> 

<p align="center">
<a href="https://nextjs.org/">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
</a>
<a href="https://expo.dev/">
  <img src="https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white" />
</a>
<a href="https://reactjs.org/">
  <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react" />
</a>
<a href="https://www.typescriptlang.org">
<img src="https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript" />
</a>
<a href="https://github.com/colinhacks/zod">
  <img src="https://img.shields.io/badge/Zod-black?style=for-the-badge&logo=zod"/>
</a>
<a href="https://tailwindcss.com/">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-000000?style=for-the-badge&logo=tailwind-css" />
</a>
<a href="https://github.com/colinhacks/zod">
  <img src="https://img.shields.io/badge/ShadCn%20ui-000000?style=for-the-badge&logo=shadcnui"/>
</a>
<a href="https://react-query.tanstack.com/">
  <img src="https://img.shields.io/badge/React%20Query-000000?style=for-the-badge&logo=react-query&logoColor=ff4154" />
</a>
<a href="https://react-hook-form.com/">
  <img src="https://img.shields.io/badge/React%20Hook%20Form-000000?style=for-the-badge&logo=reacthookform&logoColor=ec5990" />
</a>
<a href="https://www.prisma.io/">
<img src="https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=prisma" />
</a>
<a href="https://www.postgresql.org/">
  <img src="https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=336791" />
</a>
</p>

<p align="center">
<img src="./docs/cover.png" width="720px"/>
<img src="./docs/expo1.png" width="720px"/>
</p>

### **Introduction**
This app was proposed in a NLW event from [RocketSeat](https://www.rocketseat.com.br/) and its objective is to develop an application where a user can create a trip, invite guest and manage activities.   
I decided to implement using NextJs as web front-end and back-end; and React Native Expo for a mobile version.

### **User Interface**
- [Figma](https://www.figma.com/design/mPYb3uPd3Tv6ebsqeJ3GoZ/NLW-Journey-%E2%80%A2-Planejador-de-viagem-(Community)?node-id=0-1&t=Sd8vCzrR7iUMR9U7-0)

### **Main Stack**
- NextJs for web front end and back end.
  - Tailwind UI + Shadcn UI for interfaces.
  - Mobile first ui development.
  - React Query for data fetch.
  - React Hook Form for inputs.

### **Gallery**
<p align="center">
<img src="./docs/home.png" width="280px"/>
<img src="./docs/registro.png" width="280px"/>
<img src="./docs/token.png" width="280px"/>
</p>
<p align="center">
<img src="./docs/details sm.png" width="280px"/>
<img src="./docs/details.png" width="720px"/>
</p>


### **ROADMAP**
#### **Create Trip**
- [X] Trip schema
- [X] Create trip schema
- [X] Create trip endpoint
- [X] Create trip form
- [X] Firebase + Firestore
- [X] Trip Services
- [X] Email Service
- [X] Send Email to Owner
- [X] Confirm trip endpoint
- [X] Send email to guests
- [X] Redirect to trip details
- [X] Auto create if logged

#### **Trips**
- [X] List owned trips
- [X] List invited trips
- [X] Order by date
- [ ] Group concluded
- [ ] Delete trip
- [X] Guest open trip
- [ ] Calendar visualization

#### **Links**
- [X] Links schema
- [X] Create link endpoint
- [X] Link form
- [X] List links
- [X] Navigate to link
- [X] Delete Links
- [X] Collapse in SM
- [X] Empty message

#### **Create Activities**
- [X] Activity schema
- [X] Activity form
- [X] Save activity
- [X] List activities
- [X] Check / uncheck activity
- [X] Edit activity
- [X] Delete activity
- [ ] Show activities out-of-date
- [X] Empty message

#### **Manage Guests**
- [X] List guest
- [X] Invite guest
- [ ] Manage guests
- [X] Empty message

#### **Other**
- [ ] Deploy Next
- [X] Loadings
- [X] Desktop UI
- [X] Tablet UI
- [ ] Improve email templates

#### **Api**
- [ ] Configure server
- [ ] Configure routes