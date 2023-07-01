import { useRef } from "react";
import { SearchBar, SpinLoading, Toast } from "antd-mobile";
import { EnvironmentOutline } from "antd-mobile-icons";
import Style from "./Header.module.less";

interface IProps {
  city: { name: string; adcode: string } | undefined;
  getCityAdCode: (params: { keywords: string; subdistrict: number }) => void;
}

export const Header = (props: IProps) => {
  const { city, getCityAdCode } = props;

  const searchRef: any = useRef(null);

  const onSearch = (value: string) => {
    if (!value) return;
    getCityAdCode({
      keywords: value,
      subdistrict: 0,
    });

    searchRef.current.clear();
    searchRef.current.focus();
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    onSearch(value);
  };

  return (
    <div className={Style.layout}>
      {/* 定位 */}
      <div className={Style.city}>
        <EnvironmentOutline />
        {city?.name}
      </div>
      <SearchBar
        ref={searchRef}
        placeholder="请输入中文，支持中国城市"
        onBlur={onBlur}
        onSearch={onSearch}
      />
    </div>
  );
};
