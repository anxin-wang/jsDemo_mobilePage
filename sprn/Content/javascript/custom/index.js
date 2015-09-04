function changeNumToString(number) {
	if(number < 10) {
		result = '00' + number;
	} else if(number < 99) {
		result = '0' + number;
	} else {
		result = '' + number;
	}
	return result;
}

function createPage(max_index) {
	var page_link = [null, [{
		"left" : 570,
		"top" : 645,
		'content' : 'The Clinical Pharmacokinetics of Itraconazole :An Overview',
		'subcontent' : '—— Mycoses. 1989;32( Suppl 1):67-87.',
		'pic' : '001a'
	}, {
		"left" : 610,
		"top" : 480,
		'content' : 'The Clinical Pharmacokinetics of Itraconazole :An Overview',
		'subcontent' : '—— Mycoses. 1989;32( Suppl 1):67-87.',
		'pic' : '001b'
	}, {
		"left" : 810,
		"top" : 240,
		'content' : 'Making sense of itraconazole pharmacokinetics ',
		'subcontent' : '—— Journal of Antimicrobial Chemotherapy 2005;56(Suppl. S1), i17–i22.',
		'pic' : '001c'
	}], [{
		"left" : 630,
		"top" : 140,
		'content' : 'The Pharmacokinetics Of  Itraconazole In Animals And Man: An Overview',
		'subcontent' : '—— Developrnenr and Evoluution of Antifungal Agenrts.1987;P.223-249.',
		'pic' : '002'
	}], [{
		"left" : 850,
		"top" : 130,
		'content' : 'Antifungal activity of itraconazole compared with hydroxy-itraconazole in vitro',
		'subcontent' : '—— Journal of Antimicrobial Chemotherapy 2000; 45(3):371–373.',
		'pic' : '003'
	}], [{
		"left" : 840,
		"top" : 130,
		'content' : 'Pharmacokinetics of Itraconazole (Oral Solution) in Two Groups of Human Immunodeficiency Virus-Infected Adults with Oral Candidiasis ',
		'subcontent' : '—— Antimicrob Agents Chemother. 1997 ;41(11):2554-8.',
		'pic' : '004'
	}], [{
		"left" : 500,
		"top" : 230,
		'content' : 'Interpretation of Antibiotic Concentration Ratios Measured in Epithelial Lining Fluid',
		'subcontent' : '—— Antimicrob Agents Chemother. 2008 Jan;52(1):24-36.',
		'pic' : '005a'
	}, {
		"left" : 730,
		"top" : 400,
		'content' : 'Uptake of Itraconazole by Alveolar Macrophages',
		'subcontent' : '——Antimicrob Agents Chemother. 1993 Apr;37(4):903-4.',
		'pic' : '005b'
	}, {
		"left" : 775,
		"top" : 485,
		'content' : 'Uptake of Itraconazole by Alveolar Macrophages',
		'subcontent' : '——Antimicrob Agents Chemother. 1993 Apr;37(4):903-4.',
		'pic' : '005c'
	}], [{
		"left" : 420,
		"top" : 220,
		'content' : 'Pathogenesis of Aspergillus fumigatus in Invasive Aspergillosis',
		'subcontent' : '—— Clin Microbiol Rev. 2009 Jul;22(3):447-65.',
		'pic' : '006a'
	}, {
		"left" : 860,
		"top" : 220,
		'content' : 'The immune response to fungal infections',
		'subcontent' : '—— Br J Haematol. 2005 Jun;129(5):569-82',
		'pic' : '006b'
	}], [{
		"left" : 510,
		"top" : 320,
		'content' : 'Uptake of Itraconazole by Alveolar Macrophages',
		'subcontent' : '——Antimicrob Agents Chemother. 1993 Apr;37(4):903-4.',
		'pic' : '007a'
	}, {
		"left" : 890,
		"top" : 450,
		'content' : 'Intrapulmonary Pharmacokinetics and Pharmacodynamics of Itraconazole and 14-Hydroxyitraconazole at Steady State',
		'subcontent' : '—— Antimicrob Agents Chemother. 2004 Oct;48(10):3823-7.',
		'pic' : '007b'
	}, {
		"left" : 860,
		"top" : 660,
		'content' : ['Uptake of Itraconazole by Alveolar Macrophages', 'Intrapulmonary Pharmacokinetics and Pharmacodynamics of Itraconazole and 14-Hydroxyitraconazole at Steady State'],
		'subcontent' : ['——Antimicrob Agents Chemother. 1993 Apr;37(4):903-4.', '—— Antimicrob Agents Chemother. 2004 Oct;48(10):3823-7.'],
		'pic' : ['007c-1', '007c-2']
	}], [{
		"left" : 890,
		"top" : 130,
		'content' : 'Intrapulmonary Pharmacokinetics and Pharmacodynamics of Itraconazole and 14-Hydroxyitraconazole at Steady State',
		'subcontent' : '—— Antimicrob Agents Chemother. 2004 Oct;48(10):3823-7.',
		'pic' : '008a'
	}, {
		"left" : 760,
		"top" : 650,
		'content' : ['Itraconazole trough concentrations in antifungal prophylaxis with six different dosing regimens using hydroxypropyl-b-cyclodextrin oral solution or coated-pellet capsules', 'Breakthrough invasive fungal infections in neutropenic patients after prophylaxis with itraconazole ', 'Population pharmacokinetics of intravenous itraconazole in patients with persistent neutropenic fever'],
		'subcontent' : ['——Mycoses. 1999;42(11-12):591-600.', '—— Mycoses. 1999;42(7-8):443-51.', '—— J Clin Pharm Ther. 2009 Jun;34(3):337-44.'],
		'pic' : ['008b-1', '008b-2', '008b-3']
	}], [{
		"left" : 935,
		"top" : 210,
		'content' : 'Intravenous Itraconazole Followed by Oral Itraconazole in the Treatment of Invasive Pulmonary Aspergillosis in Patients with Hematologic Malignancies, Chronic Granulomatous Disease, or AIDS ',
		'subcontent' : '—— Clin Infect Dis. 2001 Oct 15;33(8):e83-90.',
		'pic' : '009'
	}], [{
		"left" : 720,
		"top" : 260,
		'content' : 'Intravenous Itraconazole followed by Oral Itraconazole for the Treatment of Amphotericin-B-Refractory Invasive Pulmonary Aspergillosis',
		'subcontent' : '—— Acta Haematol 2003;109(3):111–118',
		'pic' : '010'
	}],
	//-----------------第11条--------------
	[{
		"left" : 450,
		"top" : 270,
		'content' : 'Efficacy and safety of intravenous itraconazole followed by oral itraconazole solution in the treatment of invasive pulmonary mycosis ',
		'subcontent' : '—— Chinese Medical Journal 2011,124(20):3415-3419',
		'pic' : '011a'
	}, {
		"left" : 890,
		"top" : 270,
		'content' : 'Efficacy and safety of intravenous itraconazole followed by oral itraconazole solution in the treatment of invasive pulmonary mycosis ',
		'subcontent' : '—— Chinese Medical Journal 2011,124(20):3415-3419',
		'pic' : '011b'
	}],
	//第12条
	[{
		"left" : 510,
		"top" : 200,
		'content' : 'modified after O‘Brien et al.ASH Edu 2003 ',
		'subcontent' : '',
		'pic' : ''
	}], [{
		"left" : 460,
		"top" : 290,
		'content' : '北京协和医院2010年全院真菌体外药敏统计',
		'subcontent' : '',
		'pic' : ''
	}, {
		"left" : 935,
		"top" : 300,
		'content' : 'Head-to-Head Comparison of the Activities of Currently Available Antifungal Agents against 3,378 Spanish Clinical Isolates of Yeasts and Filamentous Fungi ',
		'subcontent' : '—— Antimicrob Agents Chemother. 2006 Mar;50(3):917-21.',
		'pic' : '013b'
	}], [{
		"left" : 440,
		"top" : 300,
		'content' : '北京协和医院2010年全院真菌体外药敏统计',
		'subcontent' : '',
		'pic' : ''
	}, {
		"left" : 925,
		"top" : 300,
		'content' : 'In Vitro Susceptibility of the Yeast Pathogen Cryptococcus to Fluconazole and Other Azoles Varies with Molecular Genotype ',
		'subcontent' : '——J Clin Microbiol. 2010 Nov;48(11):4115-20.',
		'pic' : '014b'
	}], [{
		"left" : 220,
		"top" : 300,
		'content' : 'Patterns of Susceptibility of Aspergillus Isolates Recovered from Patients Enrolled in the Transplant-Associated Infection Surveillance Network',
		'subcontent' : '—— J Clin Microbiol. 2009 Oct;47(10):3271-5.',
		'pic' : '015a'
	}, {
		"left" : 865,
		"top" : 300,
		'content' : 'Use of Epidemiological Cutoff Values To Examine 9-Year Trends in Susceptibility of Aspergillus Species to the Triazoles',
		'subcontent' : '—— J Clin Microbiol. 2011 Feb;49(2):586-90.',
		'pic' : '015b'
	}], [{
		"left" : 750,
		"top" : 180,
		'content' : 'In Vitro Susceptibilities of 217 Clinical Isolates of Zygomycetes to Conventional and New Antifungal Agents ',
		'subcontent' : '—— Antimicrob Agents Chemother. 2007 Jul;51(7):2587-90.',
		'pic' : '016'
	}], [{
		"left" : 905,
		"top" : 180,
		'content' : 'Activities of Antifungal Agents against Yeasts and Filamentous Fungi: Assessment according to the Methodology of the European Committee on Antimicrobial Susceptibility Testing',
		'subcontent' : '—— Antimicrob Agents Chemother. 2008 Oct;52(10):3637-41.',
		'pic' : '017'
	}]
	//-----------------第20条--------------
	, null, null, [{
		"left" : 365,
		"top" : 170,
		'content' : 'The epidemiology of fungal infections in patients with hematologic malignancies: the SEIFEM-2004 study',
		'subcontent' : '—— Haematologica .2006; 91(8):1068-1075.',
		'pic' : '020'
	}], [{
		"left" : 530,
		"top" : 160,
		'content' : 'Mucormycosis in hematologic patients',
		'subcontent' : '—— haematologica. 2004; 89(2): 207-214',
		'pic' : '021'
	}], [{
		"left" : 530,
		"top" : 170,
		'content' : 'Infections in Patients with Hematological Cancer: Recent Developments ',
		'subcontent' : '—— Hematology Am Soc Hematol Educ Program. 2003;438-72.',
		'pic' : '022'
	}], [{
		"left" : 180,
		"top" : 310,
		'content' : 'Patterns of Susceptibility of Aspergillus Isolates Recovered from Patients Enrolled in the Transplant-Associated Infection Surveillance Network',
		'subcontent' : '—— J Clin Microbiol. 2009 Oct;47(10):3271-5.',
		'pic' : '023a'
	}, {
		"left" : 180,
		"top" : 340,
		'content' : 'Patterns of Susceptibility of Aspergillus Isolates Recovered from Patients Enrolled in the Transplant-Associated Infection Surveillance Network',
		'subcontent' : '—— J Clin Microbiol. 2009 Oct;47(10):3271-5.',
		'pic' : '023a'
	}, {
		"left" : 180,
		"top" : 370,
		'content' : 'Patterns of Susceptibility of Aspergillus Isolates Recovered from Patients Enrolled in the Transplant-Associated Infection Surveillance Network',
		'subcontent' : '—— J Clin Microbiol. 2009 Oct;47(10):3271-5.',
		'pic' : '023a'
	}, {
		"left" : 180,
		"top" : 400,
		'content' : 'Patterns of Susceptibility of Aspergillus Isolates Recovered from Patients Enrolled in the Transplant-Associated Infection Surveillance Network',
		'subcontent' : '—— J Clin Microbiol. 2009 Oct;47(10):3271-5.',
		'pic' : '023a'
	}, {
		"left" : 200,
		"top" : 430,
		'content' : 'Epidemiology And Antifungal Susceptibility Of Bloodstream Fungal Isolates In Pediatric Patients: A Spanish Multicenter Prospective Survey',
		'subcontent' : '—— J Clin Microbiol. 2011 Dec;49(12):4158-63.',
		'pic' : '023b'
	}, {
		"left" : 200,
		"top" : 460,
		'content' : 'Epidemiology And Antifungal Susceptibility Of Bloodstream Fungal Isolates In Pediatric Patients: A Spanish Multicenter Prospective Survey',
		'subcontent' : '—— J Clin Microbiol. 2011 Dec;49(12):4158-63.',
		'pic' : '023b'
	}, {
		"left" : 200,
		"top" : 490,
		'content' : 'Epidemiology And Antifungal Susceptibility Of Bloodstream Fungal Isolates In Pediatric Patients: A Spanish Multicenter Prospective Survey',
		'subcontent' : '—— J Clin Microbiol. 2011 Dec;49(12):4158-63.',
		'pic' : '023b'
	}, {
		"left" : 200,
		"top" : 520,
		'content' : 'Epidemiology And Antifungal Susceptibility Of Bloodstream Fungal Isolates In Pediatric Patients: A Spanish Multicenter Prospective Survey',
		'subcontent' : '—— J Clin Microbiol. 2011 Dec;49(12):4158-63.',
		'pic' : '023b'
	}, {
		"left" : 200,
		"top" : 540,
		'content' : 'Epidemiology And Antifungal Susceptibility Of Bloodstream Fungal Isolates In Pediatric Patients: A Spanish Multicenter Prospective Survey',
		'subcontent' : '—— J Clin Microbiol. 2011 Dec;49(12):4158-63.',
		'pic' : '023b'
	}, {
		"left" : 200,
		"top" : 580,
		'content' : 'In Vitro Susceptibility of the Yeast Pathogen Cryptococcus to Fluconazole and Other Azoles Varies with Molecular Genotype',
		'subcontent' : '—— J Clin Microbiol. 2010 Nov;48(11):4115-20. ',
		'pic' : '023c'
	}, {
		"left" : 200,
		"top" : 610,
		'content' : 'Activities of Antifungal Agents against Yeasts and Filamentous Fungi: Assessment according to the Methodology of the European Committee on Antimicrobial Susceptibility Testing',
		'subcontent' : '—— Antimicrob Agents Chemother. 2008 Oct;52(10):3637-41. ',
		'pic' : '023d'
	}, {
		"left" : 200,
		"top" : 640,
		'content' : 'Activities of Antifungal Agents against Yeasts and Filamentous Fungi: Assessment according to the Methodology of the European Committee on Antimicrobial Susceptibility Testing',
		'subcontent' : '—— Antimicrob Agents Chemother. 2008 Oct;52(10):3637-41. ',
		'pic' : '023d'
	}], [{
		"left" : 770,
		"top" : 310,
		'content' : 'Drugs.1989；37；310-344',
		'subcontent' : '',
		'pic' : ''
	}], [{
		"left" : 738,
		"top" : 240,
		'content' : 'Itraconazole oral solution and intravenous formulations: a review of pharmacokinetics and pharmacodynamics',
		'subcontent' : '—— Journal of Clinical Pharmacy and Therapeutics. 2001; 26, 159-169',
		'pic' : '025'
	}], [{
		"left" : 320,
		"top" : 260,
		'content' : 'Intrapulmonary Pharmacokinetics and Pharmacodynamics of Itraconazole and14-Hydroxyitraconazole at Steady State',
		'subcontent' : '—— Antimicrobial Agents And Chemotherapy, Oct. 2004, p. 3823–3827',
		'pic' : '026a'
	}, {
		"left" : 825,
		"top" : 260,
		'content' : 'Itraconazole lung concentrations in haematological patients',
		'subcontent' : '—— mycoses. 2000; 43, 125–127',
		'pic' : '026b'
	}], [{
		"left" : 880,
		"top" : 240,
		'content' : 'Efficacy of intravenous itraconazole against invasive pulmonary aspergillosis in neutropenic mice ',
		'subcontent' : '—— J Infect Chemother .2006; 12:355–362',
		'pic' : '027a'
	}, {
		"left" : 840,
		"top" : 680,
		'content' : 'Itraconazole lung concentrations in haematological patients',
		'subcontent' : '—— mycoses. 2000; 43, 125–127',
		'pic' : '027b'
	}], [{
		"left" : 340,
		"top" : 170,
		'content' : 'Pharmacokinetics and Safety of a 7-Day Administration of Intravenous Itraconazole followed by a 14-Day Administration of Itraconazole Oral Solution in Patients with Hematologic Malignancy ',
		'subcontent' : '—— Antimicrobial Agents And Chemotherapy. 2001; 45:981–985.',
		'pic' : '028'
	}], [{
		"left" : 340,
		"top" : 170,
		'content' : 'Population pharmacokinetics of intravenous itraconazole in patients with persistent neutropenic fever',
		'subcontent' : '—— Journal of Clinical Pharmacy and Therapeutics .2009; 34: 337–344.',
		'pic' : '029'
	}], [{
		"left" : 880,
		"top" : 160,
		'content' : 'Efficacy and safety of itraconazole as empirical antifungal therapy in febrile neutropenic patients with hematologic malignancies: an  open-lable, multicenter, observational trial in a Chinese cohort ',
		'subcontent' : '—— Chin Med J .2011;124(22):3670-3675.',
		'pic' : '030'
	}]
	//-----------------第31条--------------
	, [{
		"left" : 820,
		"top" : 160,
		'content' : 'Efficacy and safety of intravenous itraconazole followed by oral itraconazole solution in the treatment of invasive pulmonary mycosis',
		'subcontent' : '—— Chinese Medical Journal. 2011;124(20):3415-3419.',
		'pic' : '031'
	}]]

	for(var i = 0; i <= max_index; i++) {
		var num = changeNumToString(i);
		var current_page_link = page_link[i];
		var page = '<div data-role="page" id="page' + num + '"><div data-role="content">';
		page = page + '<div  style="width:1024px;height:768px;background-image:url(resources/images/jpg/' + num + '.png);background-repeat: no-repeat;-webkit-background-size:100%;background-size:100%;"></div>';
		if(i == 25) {
			page = page + '<div id="line-25"></div>';
		}
		if(i == 27) {
			page = page + '<div id="line-27"></div>';
		}
		if(i==20){
			page=page+'<div id="arrow-20"></div>';
			page=page+'<div id="pie-20"></div>';
			page=page+'<div id="line-20"></div>';
			page=page+'<div id="number-20"></div>';
			page=page+'<div id="swipe-mask"></div>';
		}
		if(current_page_link != null) {
			for(var j = 0; j < current_page_link.length; j++) {
				if($.isArray(current_page_link[j].content)) {
					console.log()
					var content = '', subContent = '', pics = '', top = current_page_link[j].top, left = current_page_link[j].left;
					var multi_content = current_page_link[j].content;
					for(var k = 0; k < multi_content.length; k++) {
						content = content + "," + multi_content[k];
					}
					if($.isArray(current_page_link[j].subcontent)) {
						var multi_subcontent = current_page_link[j].subcontent;
						for(var l = 0; l < multi_subcontent.length; l++) {
							subContent = subContent + "," + multi_subcontent[l];
						}
					}
					if($.isArray(current_page_link[j].pic)) {
						var multi_pic = current_page_link[j].pic;
						for(var l = 0; l < multi_pic.length; l++) {
							pics = pics + "," + multi_pic[l];
						}
					}
					page = page + '<a href="#" class="reference" imgsrc="' + pics + '" content="' + content + '" subcontent="' + subContent + '" style="top:' + current_page_link[j].top + 'px;left:' + current_page_link[j].left + 'px;"></a>'
				} else {
					page = page + '<a href="#" class="reference" imgsrc="' + current_page_link[j].pic + '" content="' + current_page_link[j].content + '" subcontent="' + current_page_link[j].subcontent + '" style="top:' + current_page_link[j].top + 'px;left:' + current_page_link[j].left + 'px;"></a>'
				}

			}
		}
		page = page + '</div></div>';
		$("body").append(page);
	}
}

function enable_swipe(max_index, special_link) {
	var prev = special_link.prev, next = special_link.next;
	for(var i = 0; i <= max_index; i++) {
		var num = changeNumToString(i);
		$("#page" + num).swipeleft(function() {
			var next_index = 0;
			var currentpage = parseInt(this.id.slice(4), 10);
			while(next_index < next.length) {
				if(currentpage == next[next_index].page_num) {
					$.mobile.changePage("#page" + next[next_index].next, {
						transition : 'fade'
					});
					return;
				} else {
					next_index += 1;
				}
			}
			var nextpage = currentpage + 1;
			nextpage = changeNumToString(nextpage);
			$.mobile.changePage("#page" + nextpage, {
				transition : 'fade'
			});
		});
		$("#page" + num).swiperight(function() {
			var prev_index = 0;
			var currentpage = parseInt(this.id.slice(4), 10);
			while(prev_index < prev.length) {
				if(currentpage == prev[prev_index].page_num) {
					$.mobile.changePage("#page" + prev[prev_index].prev, {
						transition : 'fade'
					});
					return;
				} else {
					prev_index += 1;
				}
			}
			var prevpage = currentpage - 1;
			prevpage = changeNumToString(prevpage);
			$.mobile.changePage("#page" + prevpage, {
				transition : 'fade'
			});
		});
	}
}

//main
$(document).ready(function() {
	// var page_link=null;
	// $.getJSON('javascript/custom/json/pagelink.json', function(data) {
	// page_link=data.root;
	// console.log(page_link)
	// });
	//33-39这些页面不能用createPage生成的，要直接写在页面上。因为会导致浏览器一直Loading直至卡死。
	createPage(32);
	enable_swipe(39, {
		'prev' : [{
			'page_num' : 0,
			'prev' : '-index-branch'
		}, {
			'page_num' : 19,
			'prev' : '-index-branch'
		}, {
			'page_num' : 33,
			'prev' : '-doc-index'
		}, {
			'page_num' : 37,
			'prev' : '-doc-index'
		}],
		'next' : [{
			'page_num' : 18,
			'next' : '-index-branch'
		}, {
			'page_num' : 32,
			'next' : '-index-branch'
		}, {
			'page_num' : 36,
			'next' : '-doc-index'
		}, {
			'page_num' : 39,
			'next' : '-doc-index'
		}]
	});
	$("#page025").bind("pageshow", function() {
		$("#line-25").width(754);
		//animate({width:'754'},5000,function(){});

	});
	$("#swipe-mask").bind("swipeleft",function(e){
		e.stopPropagation();
		$("#arrow-20").hide();
		$("#number-20").fadeIn('slow');
		$("#line-20").fadeIn('slow');
		$("#pie-20").fadeIn('slow');
		
	})
	$("#page027").bind("pageshow", function() {		
		$("#line-27").width(774);
	})
	$(".reference").click(function(e) {
		var content = $(this).attr("content");
		var subContent = $(this).attr("subcontent");
		var pic_url = $(this).attr("imgsrc");
		if(content.indexOf(',') >= 0) {
			//多个情况
		} else {
			//单个情况，注释new出来
		}

		$("#tooltip p").empty().append(content + '<span>' + subContent + '</span>');
		$("#mask").show();
		$("#tooltip").css({
			'height' : '0px'
		})
		if(pic_url != null && pic_url != '') {
			$("#tooltip img").attr("src", "media/img/" + pic_url + ".png");

			$("#tooltip").show('slow', function() {
				$(this).css({
					'height' : 'auto'
				});
			});
		} else {
			$("#tooltip img").attr("src", "");
			$("#tooltip").show('slow', function() {
				$(this).css({
					'height' : '120px'
				});
			});
		}

	})
	$("#tooltip").click(function(e) {
		$(this).hide('slow', function() {
			$("#mask").hide();
		});
	})
	$("#mask").click(function(e) {

		$("#tooltip").hide('slow', function() {
			$("#mask").hide();
		});
	})
});
