### [8.1.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v8.1.1) (2023-06-07)
- update useElven with fix for native auth login token handling
- update other dependenecies

### [8.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v8.1.0) (2023-06-04)
- update useElven and other dependencies

### [8.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v8.0.0) (2023-05-28)
- **Breaking:** The dapp now uses the useElven version with built-in native token support. There is no fallback, so it is a breaking change. Standard string-based tokens will be deprecated across the MultiversX soon
- update dependencies

### [7.2.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v7.2.1) (2023-05-14)
- update [useElven](https://www.useelven.com/)
- fix problems with initialization of the HW provider

### [7.2.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v7.2.0) (2023-05-06)
- update [useElven](https://www.useelven.com/)
- fix problems with handling states when strict mode is enabled

### [7.1.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v7.1.1) (2023-04-25)
- update dependecies, including [useElven](https://www.useelven.com/) with fixed bug related to WalletConnect pairings removal (thanks to @nikos-koukis for reporting)

### [7.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v7.1.0) (2023-04-23)
- update useElven where sdk-core and sdk-hw-provider where updated
- update sdk-core also in app
- code adjustments

### [7.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v7.0.0) (2023-03-05)
- switch to v0.1.0 of [useElven](https://www.useelven.com/) with support for xPortal when signing
- changes for Wallet Connect pairings list
- other minor improvements

### [6.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.1.0) (2023-03-04)
- fix passing custom configuration, one should use .env variables for that, `useNetworkSync` will read from them

### [6.0.4](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.0.4) (2023-02-26)
- change how the value is provided in useTransaction
- bump dependencies

### [6.0.3](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.0.3) (2023-02-21)
- remove unused dependencies

### [6.0.2](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.0.2) (2023-02-19)
- update @useelven/core and other dependencies

### [6.0.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.0.1) (2023-02-15)
- update @useelven/core and other dependencies

### [6.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v6.0.0) (2023-02-14)
- switch to [@useelven/core](https://www.useElven.com) when it comes to auth and core functionality

### [5.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v5.0.0) (2023-02-04)
- **Breaking:** There is no more `useScTransaction` hook. You can use `useTransaction` for all cases. You would need to prepare a proper data payload for custom smart contracts. Check the example in the Readme and code
- switch to `useProxy` from `valtio`
- enable React strict mode

### [4.3.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v4.3.0) (2023-01-28)
- `txResults` is now returned in `useTransaction` and `useScTransaction` hooks (it is ITransactionOnNetwork in sdk-core)
- dependencies updates

### [4.2.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v4.2.0) (2023-01-14)
- rebrand to multiversx (continuation)
    - npm packages are replaced
    - public api/explorer endpoints are replaced
- update dependencies

### [4.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v4.1.0) (2022-12-17)
- added `ProtectedPageWrapper` component - client side only 'gate keeper', check README.md for more info
- fix for the `useApiCall` hook
- npm dependencies updates

### [4.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v4.0.0) (2022-12-04)
- changes in how the API proxy work
- renamed env variables
- check the [README.md](https://github.com/xdevguild/nextjs-dapp-template#working-with-the-env-and-config-files) and `.env.example` file for more info
- thanks to @janniksam

### [3.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v3.1.0) (2022-12-03)
- rewritten useScQuery, but it keeps backward compatibility, you can still use simple data types like number, string and boolan as the results without ABI, if you need to catch more complex data types, you need to provide the ABI file, check for more info in the README.md file
- dependencies updates

### [3.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v3.0.0) (2022-11-16)
- dependencies updates
- first phase of 'rebranding' into MultiversX ;)
- **Breaking**: `useElrondNetworkSync` is now `useNetworkSync`

### [2.2.2](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.2.2) (2022-10-30)
- dependencies updates, also Next 13, changes in the routing will be introduced later. Waits for new Next 13 docs to be completed.

### [2.2.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.2.1) (2022-10-10)
- bugfix for the wrong usage of the Chakra Factory on CardWrapper and FlexCardWrapper components. Thanks to @janniksam for reporting that

### [2.2.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.2.0) (2022-10-09)
- dependencies updates (Next, erdjs, etc.)

### [2.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.1.0) (2022-09-04)
- new `useApiCall` hook, check the readme for more info

### [2.0.1](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.0.1) (2022-08-13)
- fix problems with rerendering (wrong memo usage)
- update dependencies

### [2.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v2.0.0) (2022-08-01)
- Nextjs update
- React update
- erdjs libraries update
- other dependencies updates
- improvements for `useScQuery` hook
- config moved to env variables - see .env.example
- minor fixes
- ts types improvements
- switched to MIT license (erdjs libs are now MIT too)

### [1.1.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v1.1.0) (2022-06-19)
- added HW provider

### [1.0.0](https://github.com/xdevguild/nextjs-dapp-template/releases/tag/v1.0.0) (2022-05-15)
- initial code
