import {Panel, PanelHeader} from "@vkontakte/vkui";
import React from "react";

const Main = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader>
                Главная
            </PanelHeader>
        </Panel>
    )
}

export default Main