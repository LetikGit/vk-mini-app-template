import {
    Group,
    Panel,
    SimpleCell,
    SplitCol
} from "@vkontakte/vkui";
import {VIEW_MAIN} from "@happysanta/router";
import {
    Icon28SearchLikeFilledOutline,
} from "@vkontakte/icons";
import React, {Fragment} from "react";
import {PAGE_MAIN, router} from "../router/router";

const DesktopRightPanel = ({ location }) => (
    <SplitCol fixed width="260px" maxWidth="260px">
        <Panel>
            <Group separator="hide" style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                <SimpleCell
                    style={location.getViewId() === VIEW_MAIN ? {
                        backgroundColor: 'var(--button_secondary_background)',
                        borderRadius: 8,
                    } : {}}
                    onClick={() => {
                        router.pushPage(PAGE_MAIN)
                    }}
                    selected={location.getViewId() === VIEW_MAIN}
                    before={<Icon28SearchLikeFilledOutline  />}
                >
                    Главная
                </SimpleCell>
            </Group>
        </Panel>
    </SplitCol>
);

export default DesktopRightPanel
