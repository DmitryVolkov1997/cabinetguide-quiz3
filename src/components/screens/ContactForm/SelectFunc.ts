import {
	cities,
	akmolinskayaOblast,
	aktyubinskayaOblast,
	almatinskayaOblast,
	almaty,
	astana,
	atyrauskaya,
	vostochnoKazakhstanskayaOblast,
	zhambylskaya,
	zko,
	karagandinskaya,
	kostanajskaya,
	kyzylordinskaya,
	mangystauskaya,
	pavlodarskaya,
	severoKazakhstanskayaOblast,
	turkestanskaya,
	shymkent,
	yuko
} from '@/components/screens/ContactForm/options'


function selectRegionFn(region: string): any {
	switch (region) {
		case 'Акмолинская':
			return akmolinskayaOblast
		case 'Актюбинская':
			return aktyubinskayaOblast
		case 'Алматинская':
			return almatinskayaOblast
		case 'Алматы':
			return almaty
		case 'Астана':
			return astana
		case 'Атырауская':
			return atyrauskaya
		case 'Восточно-Казахстанская область':
			return vostochnoKazakhstanskayaOblast
		case 'Жамбылская':
			return zhambylskaya
		case 'ЗКО':
			return zko
		case 'Карагандинская':
			return karagandinskaya
		case 'Костанайская':
			return kostanajskaya
		case 'Кызылординская':
			return kyzylordinskaya
		case 'Мангыстауская':
			return mangystauskaya
		case 'Павлодарская':
			return pavlodarskaya
		case 'Северо-Казахстанская область':
			return severoKazakhstanskayaOblast
		case 'Туркестанская':
			return turkestanskaya
		case 'Шымкент':
			return shymkent
		case 'ЮКО':
			return yuko
		default:
			return cities
	}
}

export { selectRegionFn }