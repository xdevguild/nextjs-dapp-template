import { NextPage } from 'next';
import { Card, CardContent } from '@/components/ui/card';

const Docs: NextPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="mb-4">
        <CardContent className="mt-6">
          <h1 className="text-3xl font-bold mb-4">Documentation</h1>
          <p className="text-lg">
            Comprehensive documentation for the useElven SDK integrated within
            our Next.js Dapp Template.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="mb-4">
            The Next.js Dapp Template is a complete solution for building
            decentralized applications on the MultiversX blockchain. Built with
            Next.js, Shadcn UI, and Tailwind CSS, it leverages the useElven SDK
            for seamless blockchain interactions.
          </p>
          <p className="mb-4">
            It supports the new Next.js App Router architecture and includes
            built-in tools for user authentication, wallet connections,
            transaction processing, and more.
          </p>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="mt-6">
          <h2 className="text-2xl font-bold mb-4">useElven SDK Reference</h2>
          <p className="mb-4">
            The useElven SDK provides a set of React hooks and utilities
            designed to facilitate interactions with the MultiversX blockchain.
            It includes support for:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Authentication and wallet connection (e.g.,{' '}
              <code>LoginModalButton</code>, <code>Authenticated</code>,{' '}
              <code>ProtectedPageWrapper</code>)
            </li>
            <li>Fetching user data and blockchain state</li>
            <li>Performing transactions like EGLD transfers and NFT minting</li>
          </ul>
          <p className="mb-4">
            For more detailed information, check out the official{' '}
            <a
              href="https://www.useelven.com/docs/sdk-reference.html"
              target="_blank"
              className="underline font-bold"
            >
              useElven SDK documentation
            </a>
            .
          </p>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Next.js Dapp Template Integration
          </h2>
          <p className="mb-4">
            This template integrates the useElven SDK seamlessly with Next.js,
            taking advantage of modern React patterns and the App Router for
            improved performance and developer experience.
          </p>
          <p className="mb-4">
            The starter kit includes examples of various components and hooks to
            initiate wallet connections, handle user authentication, and
            interact with smart contracts, making it easy to build and scale
            your dapp.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Running Locally</h3>
          <p className="mb-2">
            You can run the project locally using one of the following methods:
          </p>
          <p className="mb-2 font-semibold">
            Option 1: Using buildo-begins CLI
          </p>
          <pre className="bg-gray-100 p-3 rounded mb-2 text-sm overflow-x-auto">
            <code>{`npx buildo-begins@latest init`}</code>
          </pre>
          <p className="mb-2">Choose Next.js dapp template from the list.</p>
          <p className="mb-2 font-semibold">Option 2: Manual Setup</p>
          <ol className="list-decimal list-inside mb-2">
            <li>Clone or download the repo.</li>
            <li>
              Navigate to the project directory:{' '}
              <code>cd nextjs-dapp-template</code>
            </li>
            <li>
              Install dependencies with <code>npm install</code>.
            </li>
            <li>
              Copy the environment example file:{' '}
              <code>cp .env.example .env.local</code>.
            </li>
            <li>
              Run the development server with <code>npm run dev</code>.
            </li>
            <li>
              For production, build with <code>npm run build</code> and start
              with <code>npm start</code>.
            </li>
          </ol>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Environment Variables and Configuration
          </h2>
          <p className="mb-4">
            The project uses a set of environment variables defined in an{' '}
            <code>.env</code> file to manage configuration for different
            environments. Variables prefixed with <code>NEXT_PUBLIC_</code> are
            exposed to the frontend.
          </p>
          <p className="mb-4">
            Copy the <code>.env.example</code> file to <code>.env.local</code>{' '}
            and modify the values as needed. Key variables include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <code>NEXT_PUBLIC_MULTIVERSX_CHAIN</code>: Set this to{' '}
              <code>devnet</code>, <code>testnet</code>, or <code>mainnet</code>
            </li>
            <li>
              <code>NEXT_PUBLIC_WC_PROJECT_ID</code>: Your WalletConnect 2
              Project ID
            </li>
            <li>
              <code>NEXT_PUBLIC_DAPP_HOST</code>: The main URL of your dapp
            </li>
            <li>
              <code>NEXT_PUBLIC_TRANSFER_ADDRESS</code>: The address used for
              demo EGLD transfers
            </li>
            <li>
              <code>NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS</code>: Smart
              contract address for NFT minting
            </li>
            <li>
              <code>NEXT_PUBLIC_MINT_FUNCTION_NAME</code> and{' '}
              <code>NEXT_PUBLIC_QUERY_FUNCTION_NAME</code>: Function names for
              minting operations and token queries
            </li>
            <li>
              <code>NEXT_PUBLIC_MINT_PAYMENT_PER_TOKEN</code> and{' '}
              <code>NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT</code>: Define token prices
              and transfer amounts
            </li>
          </ul>
          <pre className="bg-gray-100 p-3 rounded mb-4 text-sm overflow-x-auto">
            <code>{`# .env.local example
NEXT_PUBLIC_MULTIVERSX_CHAIN=devnet
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_DAPP_HOST=http://localhost:3000
NEXT_PUBLIC_TRANSFER_ADDRESS=your_demo_transfer_address
NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS=your_mint_contract_address
NEXT_PUBLIC_MINT_FUNCTION_NAME=mint
NEXT_PUBLIC_QUERY_FUNCTION_NAME=getTotalTokensLeft
NEXT_PUBLIC_MINT_PAYMENT_PER_TOKEN=0.01
NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT=0.001`}</code>
          </pre>
          <p className="mb-4">
            Ensure these values are properly configured for your deployed
            environment to securely manage both public and private settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Docs;
