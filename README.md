### NextJS Dapp Template

- [multiversx-nextjs-dapp.netlify.com](https://multiversx-nextjs-dapp.netlify.com)

Nextjs alternative to the [sdk-dapp](https://github.com/multiversx/mx-sdk-dapp).
Based on [Elven Tools Dapp](https://www.elven.tools/docs/minter-dapp-introduction.html), (It is developed simultaneously, and at some stages, it will have more core functionality)

The Dapp is built using Nextjs and a couple of helpful tools.
It has straightforward and complete functionality.

### Main assumption for the dapp:

- it works on Nextjs
- it uses sdk-core without the dapp-core library.
it uses backed-side redirections to hide the API endpoint. The only exposed one is `/api/multiversx` and it is used only by the dapp internally
- it uses the .env file - there is an example in the repo (for all configurations, also for the demo config)
- it uses chakra-ui

### How to start it locally:

1. clone or download the repo
2. `cd nextjs-dapp-template`
3. `npm install`
4. configure .env.local (you can copy the contents of the .env.example) `cp .env.example .env.local`
5. `npm run dev` -> for development
6. `npm run build` -> `npm start` for production

Check how to deploy a very similar dapp using the Netlify services: https://www.elven.tools/docs/dapp-deployment.html

### Howto

For simplicity, the template uses the main index page with demo components built using the core building blocks. Below you will find the list of most essential utilities, hooks, and components with examples that are actual code from the template. You can search them in the code to better understand how they work.

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
    <>
      <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
        Connect your wallet!
      </Text>
      <Flex mt={4} justifyContent="center">
        <LoginModalButton />
      </Flex>
    </>
  }
>
  <Box>Do something here in the auth context...</Box>
</Authenticated>
```

### ProtectedPageWrapper

The component wraps your page contents and will display them only for logged-in users. Otherwise, it will redirect to a defined path. Remember that this is only a client-side check. So don't rely on it with the data that should be private and secured.

```jsx
import { ProtectedPageWrapper } from './components/tools/ProtectedPageWrapper';

const Profile = () => {
  return (
    <ProtectedPageWrapper>
      <Text>The content for logged-in only!</Text>
      <Text>For example the profile page or any other that should be accessible only for logged-in users</Text>
    </ProtectedPageWrapper>
  );
};

export default Profile;
```

### Working with the API

By default, the Dapp provides the `.env.example`, configured not to use the API rewrites and configured to use the official public MultiversX API endpoint. 

You have three options:

1. By commenting this out the dapp will use the default MultiversX api endpoint (e.g. https://devnet-api.multiversx.com) \
  **Note**: `MULTIVERSX_PRIVATE_API` needs to be removed/commented out.
2. Set this to an absolute address to use a custom MultiversX api endpoint
   (e.g. http://dev.mydomain.com) \
  **Note**: `MULTIVERSX_PRIVATE_API` needs to be removed/commented out.
3. Enter a relative path to proxy/mask your MultiversX api endpoint (e.g. /api/multiversx)
   Only current instance of the Dapp can use it if only `API_ALLOWED_DAPP_HOST` is set.  \
  **Note**: `MULTIVERSX_PRIVATE_API` must include the actual MultiversX API endpoint.

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

#
# Either the public API endpoint of your MultiversX api
# or the masked proxy that will be used instead.
#
# You have three options:
#
# 1. By commenting this out the dapp will use the default
#    MultiversX api endpoint (e.g. https://devnet-api.multiversx.com)
#
#    Note: MULTIVERSX_PRIVATE_API needs to be removed/commented out.
#
# 2. Set this to an absolute address to use a custom MultiversX api endpoint
#    (e.g. http://dev.mydomain.com)
#
#    Note: MULTIVERSX_PRIVATE_API needs to be removed/commented out.
#
# 3. Enter a relative path to proxy/mask your MultiversX api endpoint (e.g. /api/multiversx)
#    Only current instance of the Dapp can use it if only API_ALLOWED_DAPP_HOST is set.
#
#    Note: MULTIVERSX_PRIVATE_API must include the actual MultiversX API endpoint.
#
NEXT_PUBLIC_MULTIVERSX_API = /api/multiversx

# This is basically the main domain of your dapp
NEXT_PUBLIC_DAPP_HOST = http://localhost:3000

# =============================================
# Private variables (used on the backend)
# =============================================

# The MultiversX api endpoint, that is being masked/proxied.
# This can be either a custom api endpoint or the default MultiversX api endpoint.
# You will have to delete this or comment this out, if you don't wanna
# mask / proxy your MultiversX api endpoint.
MULTIVERSX_PRIVATE_API = https://devnet-api.multiversx.com

# Only this host will be allowed to consume the API (optional)
# It will work only inside the Dapp, no one will be able to use the endpoint, even in browser
# When removed the API will be available for testing through browser, Postman etc.
API_ALLOWED_DAPP_HOST = http://localhost:3000

# =============================================
# Public variables for the the demo only
# =============================================

# The wallet address used for the demo EGLD transaction on the devnet
NEXT_PUBLIC_EGLD_TRANSFER_ADDRESS = erd17a4wydhhd6t3hhssvcp9g23ppn7lgkk4g2tww3eqzx4mlq95dukss0g50f

# The smart contract address used for minting the NFT token (as example deployed Elven Tools Smart Contract)
NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS = erd1qqqqqqqqqqqqqpgq5za2pty2tlfqhj20z9qmrrpjmyt6advcgtkscm7xep

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

You can set up the chain type here. Use `NEXT_PUBLIC_MULTIVERSX_CHAIN` to set devnet, testnet or mainnet.

Each hosting provider will have a different way of doing that. We will take a look at how Netlify is doing that below.

### Deployment

For deployment, we recommend the [Netlify](https://www.netlify.com/). Why Netlify? Because it is the simplest way to deploy the Nextjs app for free. Of course, the most recommended is the [Vercel](https://vercel.com/) which you could also try.

As for Netlify, the only what you need to do there is to go to the settings and configure from which repository the app should be deployed. Check out how: [Netlify getting started](https://docs.netlify.com/get-started/).

Then fill up the env variables. See how here: [Netlify env vars setup](https://docs.netlify.com/configure-builds/environment-variables).

On each repository code push, the Netlify services will redeploy the app.

Read more about it here: https://www.elven.tools/docs/dapp-deployment.html

Here are other deployment solutions: [NextJS Deployment](https://nextjs.org/docs/deployment).

### Other solutions

The same dapp, but with Tailwind instead Chakra UI:

- [nextjs-dapp-template-tw](https://github.com/xdevguild/nextjs-dapp-template-tw)

If you would like to test other templates check:

- [erd-next-starter](https://github.com/Elrond-Giants/erd-next-starter)
- [dapp-template]https://github.com/multiversx/mx-template-dapp)

Dapps using the template (send the links if you used it, use issues here on GitHub):

- [Elven Tools Dapp](https://dapp-demo.elven.tools/)
- [MultiversX ESDT Faucet Dapp](https://devnet-multiversx-esdt-faucet.netlify.app/)

Compact MultiversX SDK for browsers (no build steps required)

- [Elven.js](https://www.elvenjs.com)

### Contact

- [xDevGuild](https://github.com/xdevguild)
