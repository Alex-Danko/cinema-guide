import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { MainPage } from './pages/MainPage/MainPage';
import { GenresPage } from './pages/GenresPage/GenresPage';
import { GenrePage } from './pages/GenrePage/GenrePage';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { Search } from './components/Search/Search';
import { useContext, useEffect, useState } from 'react';
import { AuthModal } from './components/AuthModal/AuthModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from './api/api';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { Loader } from './ui/Loader/Loader';
import { AuthContext, FavsContext } from './AppWrapper';
import { SearchModal } from './components/SearchModal/SearchModal';



function App() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [authOpen, setAuthOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const authContext = useContext(AuthContext);
	const favsContext = useContext(FavsContext);

	const queryClient = useQueryClient();
	const meQuery = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: false,
		refetchOnWindowFocus: false,
	}, queryClient)

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	switch (meQuery.status) {
		case 'error':
			authContext.authorized = "no";
			favsContext.favourites = [];
			break;
		case 'success':
			authContext.authorized = "yes";
			favsContext.favourites = [...meQuery.data.favorites];
			break;
		case 'pending':
			authContext.authorized = "loading";
			break
	}


	return (<>
		<BrowserRouter>
			<div className='container'>
				<div className="header">
					<nav className="nav-menu">
						{isMobile
							? (<>
								<Link className='logo-white' to={"/"}>
									<img src={require("./assets/img/logo-white.png")} alt="Маруся" />
								</Link>
								<div className="nav-menu-middle">
									<NavLink className='nav-link menu-link' to={"/genres"}>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z"
												fill="white"
											/>
										</svg>
									</NavLink>
									<div>
										<div className="menu-link" onClick={() => setSearchOpen(true)}>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="white" />
											</svg>

										</div>
										<SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
									</div>
									{authContext.authorized === "loading"
										? (<Loader />)
										: (authContext.authorized === "yes"
											? (<NavLink className='nav-link menu-link' to={"/me"}>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white" />
												</svg>
											</NavLink>)
											: (<div>
												<div className="menu-link" onClick={() => setAuthOpen(true)}>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white" />
													</svg>
												</div>
												<AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
											</div>))}
								</div>
							</>)
							: (<>
								<Link className='logo-white' to={"/"}>
									<img src={require("./assets/img/logo-white.png")} alt="Маруся" />
								</Link>
								<div className="nav-menu-middle">
									<NavLink className='nav-link menu-link menu-link-home' to={"/"}>Главная</NavLink>
									<NavLink className='nav-link menu-link' to={"/genres"}>Жанры</NavLink>
									<Search />
								</div>
								{authContext.authorized === "loading"
									? (<Loader />)
									: (authContext.authorized === "yes"
										? (<NavLink className='nav-link menu-link' to={"/me"}>{meQuery.data?.name ? meQuery.data?.name : meQuery.data?.email}</NavLink>)
										: (<div>
											<div className="menu-link" onClick={() => setAuthOpen(true)}>
												Войти
											</div>
											<AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
										</div>))}
							</>)
						}
					</nav>
				</div>

				<div className="section">
					<main className="content">
						<Routes>
							<Route path="/" element={<MainPage setAuthOpen={setAuthOpen} />} />
							<Route path="/genres" element={<GenresPage />} />
							<Route path="/genres/:genre" element={<GenrePage />} />
							<Route path="/movie/:movieId" element={<MoviePage random={false} setAuthOpen={setAuthOpen} />} />
							{meQuery.data
								? <Route path="/me" element={<AccountPage data={{ name: meQuery.data?.name, surname: meQuery.data?.surname, email: meQuery.data?.email, favorites: meQuery.data?.favorites }} />} />
								: <Route path="/" element={<MainPage setAuthOpen={setAuthOpen} />} />}
						</Routes>
					</main>
				</div>

				<div className="footer">
					<div className="footer-socials">
						<a className="footer-socials-link" href="https://skillbox.ru/">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="white" strokeOpacity="0.8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M26.4865 14.3797C26.6253 13.9851 26.4865 13.6981 25.8719 13.6981H23.8298C23.3144 13.6981 23.0764 13.9492 22.9377 14.2183C22.9377 14.2183 21.8869 16.5141 20.4198 18.0027C19.9439 18.4332 19.7259 18.5767 19.4682 18.5767C19.3293 18.5767 19.1509 18.4332 19.1509 18.0386V14.3617C19.1509 13.8954 18.9923 13.6802 18.5561 13.6802H15.3444C15.0271 13.6802 14.8289 13.8954 14.8289 14.1106C14.8289 14.5591 15.5624 14.6667 15.6417 15.9222V18.6484C15.6417 19.2403 15.5228 19.3479 15.2651 19.3479C14.5711 19.3479 12.886 17.0342 11.8748 14.3976C11.6765 13.8775 11.4783 13.6802 10.9629 13.6802H8.90093C8.30617 13.6802 8.20703 13.9313 8.20703 14.2003C8.20703 14.6846 8.90093 17.1239 11.4386 20.3524C13.1239 22.5585 15.5228 23.7422 17.6838 23.7422C18.9923 23.7422 19.1509 23.4732 19.1509 23.0248V21.3568C19.1509 20.8187 19.2699 20.729 19.6862 20.729C19.9836 20.729 20.5189 20.8725 21.7283 21.9307C23.1161 23.1862 23.354 23.7602 24.1272 23.7602H26.1693C26.764 23.7602 27.0416 23.4911 26.883 22.971C26.7046 22.4509 26.0305 21.6976 25.1582 20.8007C24.6823 20.2986 23.9686 19.7426 23.7505 19.4735C23.4531 19.1148 23.5324 18.9713 23.7505 18.6484C23.7307 18.6484 26.2287 15.4559 26.4865 14.3797Z" fill="white" fillOpacity="0.8" />
							</svg>
						</a>
						<a className="footer-socials-link" href="https://skillbox.ru/">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="white" strokeOpacity="0.8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M24.0013 13.0496C24.6622 13.2309 25.1827 13.7653 25.3593 14.4439C25.6803 15.6738 25.6803 18.24 25.6803 18.24C25.6803 18.24 25.6803 20.8061 25.3593 22.036C25.1827 22.7146 24.6622 23.249 24.0013 23.4305C22.8035 23.76 18.0003 23.76 18.0003 23.76C18.0003 23.76 13.1971 23.76 11.9993 23.4305C11.3383 23.249 10.8179 22.7146 10.6412 22.036C10.3203 20.8061 10.3203 18.24 10.3203 18.24C10.3203 18.24 10.3203 15.6738 10.6412 14.4439C10.8179 13.7653 11.3383 13.2309 11.9993 13.0496C13.1971 12.72 18.0003 12.72 18.0003 12.72C18.0003 12.72 22.8035 12.72 24.0013 13.0496ZM16.5603 16.0802V20.8802L20.4003 18.4803L16.5603 16.0802Z" fill="white" fillOpacity="0.8" />
							</svg>
						</a>
						<a className="footer-socials-link" href="https://skillbox.ru/">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="white" strokeOpacity="0.8" />
								<path d="M19.919 22.2623L22.5725 24.8239C23.116 25.3475 23.116 26.1979 22.5725 26.7221C22.0294 27.2462 21.1493 27.2462 20.6069 26.7221L17.998 24.2049L15.3914 26.7221C15.1196 26.9839 14.7635 27.1149 14.4074 27.1149C14.0518 27.1149 13.6962 26.9839 13.4244 26.7221C12.8814 26.1979 12.8814 25.3481 13.4238 24.8239L16.0776 22.2623C15.1114 22.0498 14.1796 21.6803 13.3213 21.1605C12.6718 20.7652 12.4767 19.937 12.8859 19.3094C13.2941 18.6811 14.1523 18.4919 14.803 18.8873C16.7461 20.0672 19.2493 20.0675 21.1936 18.8873C21.8443 18.4919 22.7023 18.6811 23.1112 19.3094C23.5205 19.9364 23.3248 20.7652 22.6753 21.1605C21.817 21.6808 20.8852 22.0498 19.919 22.2623Z" fill="white" fillOpacity="0.8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M13.2402 13.942C13.2402 16.468 15.3691 18.5227 17.9868 18.5227C20.605 18.5227 22.7333 16.468 22.7333 13.942C22.7333 11.4152 20.605 9.35992 17.9868 9.35992C15.3691 9.35992 13.2402 11.4152 13.2402 13.942ZM19.952 13.9415C19.952 12.8954 19.0705 12.0447 17.9867 12.0447C16.9038 12.0447 16.0214 12.8954 16.0214 13.9415C16.0214 14.9868 16.9038 15.838 17.9867 15.838C19.0705 15.838 19.952 14.9868 19.952 13.9415Z" fill="white" fillOpacity="0.8" />
							</svg>
						</a>
						<a className="footer-socials-link" href="https://skillbox.ru/">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="white" strokeOpacity="0.8" />
								<path d="M8.60008 17.8588C10.2834 16.9316 12.1625 16.1577 13.9182 15.3799C16.9388 14.1058 19.9713 12.8539 23.0344 11.6883C23.6304 11.4897 24.7012 11.2955 24.8062 12.1787C24.7487 13.4288 24.5122 14.6717 24.35 15.9145C23.9382 18.6476 23.4623 21.3714 22.9982 24.0955C22.8383 25.0029 21.7016 25.4726 20.9742 24.892C19.2263 23.7113 17.465 22.5421 15.7394 21.3341C15.1741 20.7597 15.6983 19.9349 16.2031 19.5247C17.6427 18.106 19.1695 16.9006 20.5339 15.4085C20.9019 14.5197 19.8145 15.2687 19.4558 15.4982C17.4849 16.8564 15.5623 18.2975 13.4844 19.4911C12.423 20.0754 11.1859 19.5761 10.125 19.25C9.17372 18.8562 7.77979 18.4594 8.59999 17.8589L8.60008 17.8588Z" fill="white" fillOpacity="0.8" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</BrowserRouter>
		<div id='modal'></div>
	</>
	);
}

export default App;
