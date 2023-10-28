### NextJS Dapp Template

- [multiversx-nextjs-dapp.netlify.com](https://multiversx-nextjs-dapp.netlify.com)

Nextjs alternative to the [sdk-dapp](https://github.com/multiversx/mx-sdk-dapp).

The Dapp is built using Nextjs and a couple of helpful tools ([Shadcn UI](https://ui.shadcn.com/) ([Radix UI](https://www.radix-ui.com/)) + [Tailwind](https://tailwindcss.com/))
It has straightforward and complete functionality.

**For older Chakra UI version and Next.js Page Router architecture check the [v8.4.0](https://github.com/xdevguild/nextjs-dapp-template/tree/v8.4.0)**

### Main assumption for the dapp:

- it works with Next.js and new App Router architecture
- it uses [sdk-core](https://github.com/multiversx/mx-sdk-js-core) **without** the [dapp-core](https://github.com/multiversx/mx-sdk-dapp) library. All through [useElven](https://www.useElven.com) library.
- it uses the .env file - there is an example in the repo (for all configurations, also for the demo config)
- it uses [Radix UI](https://www.radix-ui.com/) + [Tailwind](https://tailwindcss.com/), wrapped with [Shadcn UI](https://ui.shadcn.com/)

### How to start it locally:

1. clone or download the repo
2. `cd nextjs-dapp-template`
3. `npm install`
4. configure .env.local (you can copy the contents of the .env.example) `cp .env.example .env.local`
5. `npm run dev` -> for development
6. `npm run build` -> `npm start` for production

Check how to deploy a very similar dapp using the Netlify services: https://www.elven.tools/docs/dapp-deployment.html

### Howto

Below you will find the list of most essential utilities, hooks, and components with examples that are actual code from the template. You can search them in the code to better understand how they work.

There are much more hooks and tools, but most of them are already used in the ones listed below.

The code samples are not ready to copy and paste. Please search for them in the code.

### @useelven/hooks

The template is based on `@useelven/core` npm library.

- [@useelven/hooks docs](https://www.useElven.com) - React hooks for MultiversX blockchain

Besides that, there are custom React components that will help you with development.

#### LoginModalButton

The component provides the `Connect` button with the modal, which will contain another three buttons for four different authentication possibilities (xPortal Mobile App, MultiversX Defi Wallet - browser extension, MultiversX Web Wallet). You should be able to use it in any place on the website.

```jsx
import { LoginModalButton } from '../tools/LoginModalButton';

<LoginModalButton />;
```

#### Authenticated

The component is used as a small wrapper where we need to be in the authenticated context, for example, for all transactions.

It can display the spinner and also the fallback React element.

**Important** Do not wrap it in big sections of the code. Its purpose is to be used multiple times on as small blocks as possible.

```jsx
<Authenticated
  spinnerCentered
  fallback={
    <div className="font-bold text-2xl text-center mt-8">
      Connect your wallet!
    </div>
  }
>
```

### ProtectedPageWrapper

The component wraps your page contents and will display them only for logged-in users. Otherwise, it will redirect to a defined path. Remember that this is only a client-side check. So don't rely on it with the data that should be private and secured.

```jsx
import { ProtectedPageWrapper } from './components/tools/ProtectedPageWrapper';

const Profile = () => {
  return (
    <ProtectedPageWrapper>
      <div>The content for logged-in only!</div>
      <div>For example the profile page or any other that should be accessible only for logged-in users</div>
    </ProtectedPageWrapper>
  );
};

export default Profile;
```

### Working with the API

By default, the Dapp provides the `.env.example`, configured to use the official public MultiversX API endpoint. 

You can use the public API, but it is always recommended to maintain your own instance of the API, or you can also use some third party services.

### Working with the .env and config files

There is an `env.example` file that you can copy and rename into `.env.local` to run the app locally. You would need to configure these variables for your production-ready dapp.

Here are all variables:

```bash
# =============================================
# Public variables (exposed on the frontend)
# =============================================

# MultiversX chain (can be devnet, testnet, mainnet)
NEXT_PUBLIC_MULTIVERSX_CHAIN = devnet

# Wallet Connect 2 Project Id. This one will work only with this project
# Get yours at: https://cloud.walletconnect.com/sign-in
NEXT_PUBLIC_WC_PROJECT_ID = be161e9c2764269adc6a5cf4304c3a22

# This is basically the main domain of your dapp
NEXT_PUBLIC_DAPP_HOST = http://localhost:3000

# =============================================
# Public variables for the demo only
# =============================================

# The wallet address used for the demo EGLD transaction on the devnet
NEXT_PUBLIC_EGLD_TRANSFER_ADDRESS = erd17a4wydhhd6t3hhssvcp9g23ppn7lgkk4g2tww3eqzx4mlq95dukss0g50f

# The smart contract address used for minting the NFT token (as example deployed Elven Tools Smart Contract)
NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS = erd1qqqqqqqqqqqqqpgqztp5vpqrxe2tha224jwsa3sv2800a88zgtksar2kc8

# The function/endpoint name for minting on the smart contract
NEXT_PUBLIC_MINT_FUNCTION_NAME = mint

# The function/view name for getting the total tokens left to be mint on smart contract
NEXT_PUBLIC_QUERY_FUNCTION_NAME = getTotalTokensLeft

# The payment per one NFT token, defined on smart contract (0.01 EGLD)
NEXT_PUBLIC_MINT_PAYMENT_PER_TOKEN = 0.01

# The amount of EGLD to send in the demo transfer (0.001 EGLD)
NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT = 0.001

```

All variables which start with `NEXT_PUBLIC_` will be readable on the frontend side of the dapp. So please don't use them for any secret keys and data. If you need something to be available only on the backend side, don't use the `NEXT_PUBLIC_` prefix.

You can set up the chain type. Use `NEXT_PUBLIC_MULTIVERSX_CHAIN` to set `devnet`, `testnet` or `mainnet`.

Each hosting provider will have a different way of setting the env variables. We will take a look at how Netlify is doing that below.

### Deployment

For deployment, we recommend the [Netlify](https://www.netlify.com/). Why Netlify? Because it is the simplest way to deploy the Nextjs app for free. Of course, the most recommended is the [Vercel](https://vercel.com/) which you could also try.

As for Netlify, the only what you need to do there is to go to the settings and configure from which repository the app should be deployed. Check out how: [Netlify getting started](https://docs.netlify.com/get-started/).

Then fill up the env variables. See how here: [Netlify env vars setup](https://docs.netlify.com/configure-builds/environment-variables).

On each repository code push, the Netlify services will redeploy the app.

Read more about it here: https://www.elven.tools/docs/dapp-deployment.html

Here are other deployment solutions: [NextJS Deployment](https://nextjs.org/docs/deployment).

### Other tools

If you would like to test other templates check:

- [erd-next-starter](https://github.com/Elrond-Giants/erd-next-starter)
- [dapp-template](https://github.com/multiversx/mx-template-dapp)

Compact MultiversX SDK for browsers (no build steps required)

- [Elven.js](https://www.elvenjs.com)

Tools that can help you with interactions:

- [Buildo.dev](https://www.buildo.dev)
- [Buildo Begins](https://github.com/xdevguild/buildo-begins)
- [Elven Tools](https://www.elven.tools)

### Contact

- [julian.io](https://www.julian.io)
