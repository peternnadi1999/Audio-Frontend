import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectBtn = () => {
  return (
    <ConnectButton.Custom >
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="w-full bg-gradient-to-r from-[#B51960] to-[#B81A3F] text-white  py-2 md:px-7 px-3 md:text-sm text-xs rounded-full"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};