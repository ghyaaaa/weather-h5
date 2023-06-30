import { SearchBar, Space } from "antd-mobile";
import { EnvironmentOutline } from "antd-mobile-icons";
import Style from "./Header.module.less";

export const Header = () => {
  return (
    <Space align="center">
      {/* 定位 */}
      <div>
        <EnvironmentOutline />
        成都
      </div>
      <SearchBar placeholder="请输入内容" />
    </Space>
  );
};
