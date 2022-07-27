import { FallingLines } from 'react-loader-spinner';
import { LoaderSection } from './Loader.styled';


export const Loader = () => {
    return (
      <LoaderSection>
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </LoaderSection>
    );
}

export default Loader;
