import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	VKCOM, IOS, ANDROID, ModalRoot, Epic, Tabbar, TabbarItem
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import appConfig from "./store/AppConfigStore"
import {useLocation, useRouter} from "@happysanta/router";
import userStore from "./store/UserStore";
import DesktopRightPanel from "./components/DesktopRightPanel";
import {PAGE_MAIN, PANEL_MAIN, VIEW_MAIN} from "./router/router";
import Main from "./panels/Main";
import {Icon28SearchLikeFilledOutline} from "@vkontakte/icons";

const App = () => {
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const location = useLocation()
	const router = useRouter();

	switch (new URLSearchParams(window.location.search).get('vk_platform')) {
		case 'desktop_web':
			appConfig.setPlatform(VKCOM);
			break;
		case 'mobile_iphone':
			appConfig.setPlatform(IOS);
			break;
		case 'mobile_android':
			appConfig.setPlatform(ANDROID);
			break;
		default:
			break;
	}

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			userStore.setVkData(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const modal = (
		<ModalRoot
			onClose={() => router.popPage()}
			activeModal={location.getModalId()}
		>
			{/* Modals */}
		</ModalRoot>
	);

	return (
		<ConfigProvider platform={appConfig.platform}>
			<AdaptivityProvider>
				<AppRoot activeView={location.getViewId()}>
					<SplitLayout
						style={{
							justifyContent: 'center',
							backgroundColor: appConfig.platform === VKCOM ? 'var(--background_page)' : null,
						}}
					>
						<SplitCol
							spaced={appConfig.isDesktop}
							width={appConfig.isDesktop ? '560px' : '100%'}
							maxWidth={appConfig.isDesktop ? '560px' : '100%'}
						>
							<Epic activeStory={location.getViewId()} tabbar={!appConfig.isDesktop && (
								<Tabbar>
									<TabbarItem
									onClick={() => router.pushPage(PAGE_MAIN)}
									selected={location.getViewId() === VIEW_MAIN}
									text="Главная"
									>
										<Icon28SearchLikeFilledOutline />
									</TabbarItem>
								</Tabbar>
							)}>
								<View
									id={VIEW_MAIN}
									history={location.getViewHistory(VIEW_MAIN)}
									activePanel={location.getViewActivePanel(VIEW_MAIN)}
									popout={popout}
									modal={modal}
								>
									<Main id={PANEL_MAIN} />
								</View>
							</Epic>
						</SplitCol>
						{appConfig.isDesktop && (
							<DesktopRightPanel
								location={location}
							/>
						)}
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
