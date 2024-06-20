import SetupContextProvider from "../features/setup/context/SetupContext";
import OptionContainer from "../features/setup/components/OptionContainer";

function OptionPage() {
  return (
    <SetupContextProvider>
      <OptionContainer />
    </SetupContextProvider>
  );
}

export default OptionPage;
