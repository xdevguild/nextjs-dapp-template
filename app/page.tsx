import type { NextPage } from 'next';
import { SimpleDemo } from '@/components/demo/simple-demo';
import { GetUserDataDemo } from '@/components/demo/get-user-data-demo';
import { GetLoggingInStateDemo } from '@/components/demo/get-logging-in-state-demo';
import { GetLoginInfoDemo } from '@/components/demo/get-login-info-demo';
import { Authenticated } from '@/components/elven-ui/authenticated';
import { CardContent, Card } from '@/components/ui/card';

const Home: NextPage = () => {
  return (
    <>
      <Card className="mb-4">
        <CardContent className="mt-6">
          <div className="mb-4">
            Here is the demo of an MultiversX dapp for interactions with the
            blockchain and smart contracts. It provides four different ways of
            authentication and also a couple of React-based helpers/hooks. It is
            based on NextJS and uses JS SDK (sdk-core). It also uses Shadcn UI
            and Tailwind CSS.
          </div>
          <div className="mb-4">
            We have hardcoded a setup for five different operations to simplify
            things. These are:
          </div>
          <ul className="mb-4">
            <li>- Simple EGLD transfer to hardcoded address.</li>
            <li>
              - Simple Mint operation on{' '}
              <a href="https://www.elven.tools" target="_blank">
                Elven Tools
              </a>{' '}
              demo minter smart contract.
            </li>
            <li>
              - Random query operation on the Elven Tools demo minter smart
              contract.
            </li>
            <li>- Simple smart contract deployment</li>
            <li>- Signing a mesage</li>
          </ul>
          <span>
            It is to demonstrate how such things can be achieved without much
            development. Maybe later, we will come up with a much better demo
            dapp.
          </span>
          <div className="mt-3">
            For more examples please check the{' '}
            <a
              href="https://www.buildo.dev"
              className="underline font-bold"
              target="_blank"
            >
              Buildo.dev
            </a>{' '}
            app.
          </div>
        </CardContent>
      </Card>
      <Authenticated
        spinnerCentered
        fallback={
          <div className="font-bold text-2xl text-center mt-8">
            Connect your wallet!
          </div>
        }
      >
        <SimpleDemo />
        <Card className="mb-4">
          <CardContent className="mt-6">
            <div className="mb-4">
              Now let us see what other valuable tools are included.
            </div>
            <div className="mb-4">
              You can get the data of currently logged-in users and network
              state. These are:
            </div>
            <ul>
              <li>- User data such as: address, nonce, balance.</li>
              <li>- User logging in state: pending, error, loggedIn.</li>
              <li>
                - Login info state: loginMethod, expires, loginToken, signature.
              </li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex mb-4 gap-4 flex-wrap justify-center flex-col lg:flex-row">
          <GetUserDataDemo />
          <GetLoginInfoDemo />
          <GetLoggingInStateDemo />
        </div>
        <Card className="mb-4">
          <CardContent className="mt-6">
            <span>You will also get a couple of other tools, like:</span>
            <ul>
              <li>
                - Authenticated component - wrapper to check the auth state
              </li>
              <li>- LoginComponent - component with 3 auth options</li>
              <li>
                - LoginModalButton component - ready to use modal with
                LoginComponent
              </li>
              <li>
                - You will get all tools from{' '}
                <a href="https://www.useElven.com" target="_blank">
                  useElven
                </a>
              </li>
              <li>- Preserved app state after hard refresh of the page</li>
              <li>
                - And of course Shadcn UI, Tailwind CSS and NextJS framework
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="mt-6">
            <div>Better docs, and more improvements soon!</div>
            <div>
              Check the{' '}
              <a
                target="_blank"
                href="https://github.com/xdevguild"
                className="underline"
              >
                xDevGuild
              </a>
            </div>
          </CardContent>
        </Card>
      </Authenticated>
    </>
  );
};

export default Home;
