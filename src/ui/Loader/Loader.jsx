import style from './Loader.module.css';
import { LoaderSvg } from './loader.svg';

const loaderSizes = {
  small: 16,
  medium: 24,
  large: 100
};
export const Loader = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};