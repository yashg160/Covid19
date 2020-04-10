import React, { Fragment } from "react";
import "./css/Input.css";

export default class AutocompleteText extends React.Component {
	static defaultProps = {
		suggestions: [
			"barbados",
			"gibraltar",
			"lithuania",
			"malaysia",
			"nauru",
			"palestine",
			"qatar",
			"solomon-islands",
			"sri-lanka",
			"turks-and-caicos-islands",
			"vanuatu",
			"wallis-and-futuna-islands",
			"dominica",
			"gambia",
			"iran",
			"namibia",
			"tokelau",
			"guinea",
			"morocco",
			"tunisia",
			"azerbaijan",
			"honduras",
			"saint-martin-french-part",
			"chad",
			"christmas-island",
			"costa-rica",
			"bulgaria",
			"denmark",
			"malawi",
			"nepal",
			"switzerland",
			"canada",
			"china",
			"grenada",
			"andorra",
			"belgium",
			"burkina-faso",
			"cayman-islands",
			"estonia",
			"jersey",
			"montserrat",
			"oman",
			"cameroon",
			"luxembourg",
			"slovakia",
			"bosnia-and-herzegovina",
			"moldova",
			"brunei",
			"eritrea",
			"jordan",
			"liberia",
			"portugal",
			"ukraine",
			"indonesia",
			"kenya",
			"georgia",
			"iceland",
			"jamaica",
			"norfolk-island",
			"french-southern-territories",
			"guernsey",
			"paraguay",
			"tajikistan",
			"us-minor-outlying-islands",
			"uzbekistan",
			"american-samoa",
			"british-virgin-islands",
			"finland",
			"malta",
			"botswana",
			"israel",
			"saint-lucia",
			"spain",
			"argentina",
			"congo-kinshasa",
			"réunion",
			"saint-barthélemy",
			"zambia",
			"bahrain",
			"chile",
			"uruguay",
			"yemen",
			"austria",
			"bangladesh",
			"italy",
			"micronesia",
			"puerto-rico",
			"tuvalu",
			"ala-aland-islands",
			"afghanistan",
			"cambodia",
			"sao-tome-and-principe",
			"korea-north",
			"new-zealand",
			"turkey",
			"greenland",
			"hungary",
			"australia",
			"india",
			"san-marino",
			"united-kingdom",
			"comoros",
			"mauritania",
			"benin",
			"cote-divoire",
			"guadeloupe",
			"heard-and-mcdonald-islands",
			"kiribati",
			"mali",
			"northern-mariana-islands",
			"palau",
			"myanmar",
			"somalia",
			"trinidad-and-tobago",
			"turkmenistan",
			"french-guiana",
			"lao-pdr",
			"united-arab-emirates",
			"albania",
			"ireland",
			"burundi",
			"cape-verde",
			"greece",
			"guam",
			"guatemala",
			"korea-south",
			"niger",
			"panama",
			"saint-helena",
			"vietnam",
			"saint-kitts-and-nevis",
			"seychelles",
			"timor-leste",
			"bouvet-island",
			"el-salvador",
			"russia",
			"slovenia",
			"french-polynesia",
			"hong-kong-sar-china",
			"madagascar",
			"nigeria",
			"samoa",
			"british-indian-ocean-territory",
			"equatorial-guinea",
			"holy-see-vatican-city-state",
			"rwanda",
			"saint-vincent-and-the-grenadines",
			"virgin-islands",
			"congo-brazzaville",
			"guyana",
			"haiti",
			"marshall-islands",
			"singapore",
			"bhutan",
			"ghana",
			"mozambique",
			"antigua-and-barbuda",
			"cocos-keeling-islands",
			"cyprus",
			"latvia",
			"lebanon",
			"cook-islands",
			"isle-of-man",
			"libya",
			"netherlands",
			"new-caledonia",
			"niue",
			"thailand",
			"egypt",
			"faroe-islands",
			"south-georgia-and-the-south-sandwich-islands",
			"algeria",
			"brazil",
			"central-african-republic",
			"czech-republic",
			"ecuador",
			"gabon",
			"zimbabwe",
			"peru",
			"saint-pierre-and-miquelon",
			"kosovo",
			"tonga",
			"south-sudan",
			"colombia",
			"germany",
			"lesotho",
			"falkland-islands-malvinas",
			"saudi-arabia",
			"aruba",
			"swaziland",
			"united-states",
			"antarctica",
			"cuba",
			"monaco",
			"serbia",
			"anguilla",
			"maldives",
			"romania",
			"uganda",
			"japan",
			"belarus",
			"france",
			"western-sahara",
			"iraq",
			"norway",
			"philippines",
			"bahamas",
			"dominican-republic",
			"macao-sar-china",
			"bermuda",
			"pakistan",
			"pitcairn",
			"tanzania",
			"bolivia",
			"kazakhstan",
			"kyrgyzstan",
			"taiwan",
			"armenia",
			"svalbard-and-jan-mayen-islands",
			"sweden",
			"togo",
			"fiji",
			"martinique",
			"montenegro",
			"suriname",
			"venezuela",
			"angola",
			"macedonia",
			"mauritius",
			"mayotte",
			"senegal",
			"south-africa",
			"syria",
			"liechtenstein",
			"netherlands-antilles",
			"croatia",
			"djibouti",
			"mexico",
			"belize",
			"guinea-bissau",
			"mongolia",
			"poland",
			"ethiopia",
			"kuwait",
			"nicaragua",
			"papua-new-guinea",
			"sierra-leone",
			"sudan",
		],
	};

	constructor(props) {
		super(props);

		this.state = {
			// The active selection's index
			activeSuggestion: 0,
			// The suggestions that match the user's input
			filteredSuggestions: [],
			// Whether or not the suggestion list is shown
			showSuggestions: false,
			// What the user has entered
			userInput: "",
		};
	}

	// Event fired when the input value is changed
	onChange = (e) => {
		const { suggestions } = this.props;
		const userInput = e.currentTarget.value;

		// Filter our suggestions that don't contain the user's input
		const filteredSuggestions = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);

		// Update the user input and filtered suggestions, reset the active
		// suggestion and make sure the suggestions are shown
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions,
			showSuggestions: true,
			userInput: e.currentTarget.value,
		});
	};

	// Event fired when the user clicks on a suggestion
	onClick = (e) => {
		// Update the user input and reset the rest of the state
		this.setState(
			{
				activeSuggestion: 0,
				filteredSuggestions: [],
				showSuggestions: false,
				userInput: e.currentTarget.innerText,
			},
			() => this.props.newCountry(e, this.state.userInput)
		);
	};

	// Event fired when the user presses a key down
	onKeyDown = (e) => {
		const { activeSuggestion, filteredSuggestions } = this.state;

		// User pressed the enter key, update the input and close the
		// suggestions
		if (e.keyCode === 13) {
			this.setState(
				{
					activeSuggestion: 0,
					showSuggestions: false,
					userInput: filteredSuggestions[activeSuggestion],
				},
				() => this.props.newCountry(e, this.state.userInput)
			);
		}
		// User pressed the up arrow, decrement the index
		else if (e.keyCode === 38) {
			if (activeSuggestion === 0) {
				return;
			}

			this.setState({
				activeSuggestion: activeSuggestion - 1,
			});
		}
		// User pressed the down arrow, increment the index
		else if (e.keyCode === 40) {
			if (activeSuggestion - 1 === filteredSuggestions.length) {
				return;
			}

			this.setState({
				activeSuggestion: activeSuggestion + 1,
			});
		}
	};

	render() {
		const {
			onChange,
			onClick,
			onKeyDown,
			state: {
				activeSuggestion,
				filteredSuggestions,
				showSuggestions,
				userInput,
			},
		} = this;

		let suggestionsListComponent;

		if (showSuggestions && userInput) {
			if (filteredSuggestions.length) {
				suggestionsListComponent = (
					<ul className="suggestions">
						{filteredSuggestions.map((suggestion, index) => {
							let className;

							// Flag the active suggestion with a class
							if (index === activeSuggestion) {
								className = "suggestion-active";
							}

							return (
								<li
									className={className}
									key={suggestion}
									onClick={onClick}>
									{suggestion}
								</li>
							);
						})}
					</ul>
				);
			} else {
				suggestionsListComponent = (
					<div class="no-suggestions">
						<em>No suggestions, you're on your own!</em>
					</div>
				);
			}
		}

		return (
			<Fragment>
				<input
					type="text"
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={userInput}
				/>
				{suggestionsListComponent}
			</Fragment>
		);
	}
}
