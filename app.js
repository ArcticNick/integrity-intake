(function(){
'use strict';
const S=JSON.parse(localStorage.getItem('ii_state')||'null')||{cases:[{id:'II-2024-001',title:'Procurement irregularity in public works',category:'Procurement Fraud',status:'review',severity:4,date:'2024-03-15',anonymous:true,description:'Suspicious pattern of contracts awarded to same vendor across multiple departments without competitive bidding.',aiSummary:'High-confidence match: procurement fraud pattern. Similar to 3 known cases.',timeline:[{time:'Mar 15, 10:32',event:'Report submitted (anonymous)'},{time:'Mar 15, 10:33',event:'AI screening: flagged high priority'},{time:'Mar 16, 09:00',event:'Assigned to review team'},{time:'Mar 18, 14:20',event:'Additional documents requested'}]},{id:'II-2024-002',title:'Misuse of government vehicle fleet',category:'Asset Misuse',status:'new',severity:2,date:'2024-03-20',anonymous:false,description:'Multiple government vehicles observed being used for personal trips during weekends.',aiSummary:'Medium confidence. Asset misuse pattern detected.',timeline:[{time:'Mar 20, 16:45',event:'Report submitted'},{time:'Mar 20, 16:46',event:'AI screening: medium priority'}]},{id:'II-2024-003',title:'Conflict of interest in hiring panel',category:'Conflict of Interest',status:'action',severity:5,date:'2024-03-10',anonymous:true,description:'Panel member has undisclosed family relationship with selected candidate.',aiSummary:'Critical: undisclosed relationship confirmed via public records cross-reference.',timeline:[{time:'Mar 10, 08:15',event:'Report submitted (anonymous)'},{time:'Mar 10, 08:16',event:'AI screening: critical priority'},{time:'Mar 11, 10:00',event:'Escalated to senior investigator'},{time:'Mar 14, 11:30',event:'Formal investigation opened'},{time:'Mar 22, 09:00',event:'Witness interviews scheduled'}]},{id:'II-2024-004',title:'Budget allocation discrepancy',category:'Financial Misconduct',status:'resolved',severity:3,date:'2024-02-28',anonymous:false,description:'Reported discrepancy resolved after audit confirmed accounting error, not misconduct.',aiSummary:'Low risk after review. Accounting error confirmed.',timeline:[{time:'Feb 28, 13:00',event:'Report submitted'},{time:'Feb 28, 13:01',event:'AI screening: medium priority'},{time:'Mar 05, 10:00',event:'Audit initiated'},{time:'Mar 15, 16:00',event:'Resolved: accounting error confirmed'}]}],screen:'dashboard',formStep:0,formData:{category:'',title:'',description:'',location:'',anonymous:true},selectedCase:null,filter:'all',thailandNotice:false};
function save(){localStorage.setItem('ii_state',JSON.stringify(S))}
function $(s,p){return(p||document).querySelector(s)}
function $$(s,p){return[...(p||document).querySelectorAll(s)]}
const categories=['Procurement Fraud','Bribery','Conflict of Interest','Asset Misuse','Financial Misconduct','Abuse of Power','Nepotism','Other'];
const statusMap={new:{label:'New',cls:'badge-new'},review:{label:'Under Review',cls:'badge-review'},action:{label:'Action Required',cls:'badge-action'},resolved:{label:'Resolved',cls:'badge-resolved'}};
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500)}
function go(screen){S.screen=screen;save();render()}
function render(){
const a=$('#app');
const counts={total:S.cases.length,new:S.cases.filter(c=>c.status==='new').length,review:S.cases.filter(c=>c.status==='review').length,action:S.cases.filter(c=>c.status==='action').length,resolved:S.cases.filter(c=>c.status==='resolved').length};
let h=`<div class="header"><span class="shield">&#128737;</span><h1>Integrity Intake</h1><button class="menu-btn" onclick="">&#9776;</button></div>`;
if(S.screen==='dashboard') h+=renderDashboard(counts);
else if(S.screen==='report') h+=renderReport();
else if(S.screen==='cases') h+=renderCases();
else if(S.screen==='detail') h+=renderDetail();
else if(S.screen==='legal') h+=renderLegal();
h+=`<nav class="nav">`;
h+=`<button class="${S.screen==='dashboard'?'active':''}" onclick="window._go('dashboard')"><span class="icon">&#128200;</span>Dashboard</button>`;
h+=`<button class="${S.screen==='report'?'active':''}" onclick="window._go('report')"><span class="icon">&#128221;</span>Report</button>`;
h+=`<button class="${S.screen==='cases'?'active':''}" onclick="window._go('cases')"><span class="icon">&#128193;</span>Cases</button>`;
h+=`<button class="${S.screen==='legal'?'active':''}" onclick="window._go('legal')"><span class="icon">&#9878;</span>Legal</button>`;
h+=`</nav>`;
a.innerHTML=h;
}
function renderDashboard(c){
return `<div class="screen active">
<div class="card"><h2>Overview</h2>
<div class="stat-grid">
<div class="stat-box"><div class="num">${c.total}</div><div class="label">Total Reports</div></div>
<div class="stat-box"><div class="num">${c.new}</div><div class="label">New</div></div>
<div class="stat-box"><div class="num">${c.review+c.action}</div><div class="label">Active</div></div>
<div class="stat-box"><div class="num">${c.resolved}</div><div class="label">Resolved</div></div>
</div></div>
<div class="card"><h2>AI Triage Summary</h2>
<div class="ai-badge">&#9881; AI-Powered Analysis</div>
<p style="margin-top:12px">System has processed ${c.total} reports. ${c.action} require immediate attention.</p>
<div style="margin-top:12px">
<div style="display:flex;justify-content:space-between;font-size:13px"><span>High Priority</span><span>${c.action}</span></div>
<div class="progress-bar"><div class="fill fill-red" style="width:${c.total?Math.round(c.action/c.total*100):0}%"></div></div>
</div>
<div style="margin-top:8px">
<div style="display:flex;justify-content:space-between;font-size:13px"><span>Resolution Rate</span><span>${c.total?Math.round(c.resolved/c.total*100):0}%</span></div>
<div class="progress-bar"><div class="fill fill-green" style="width:${c.total?Math.round(c.resolved/c.total*100):0}%"></div></div>
</div></div>
<button class="btn btn-primary btn-full" onclick="window._go('report')">&#128221; Submit New Report</button>
<div class="card"><h2>Recent Activity</h2>
${S.cases.slice(0,3).map(cs=>`<div class="case-item" onclick="window._viewCase('${cs.id}')"><div class="case-top"><span class="case-id">${cs.id}</span><span class="badge ${statusMap[cs.status].cls}">${statusMap[cs.status].label}</span></div><div class="case-title">${cs.title}</div><div class="case-cat">${cs.category} &middot; ${cs.date}</div></div>`).join('')}
</div></div>`;
}
function renderReport(){
const steps=['Category','Details','Review'];
const f=S.formData;
let h=`<div class="screen active">`;
h+=`<div class="step-indicator">${steps.map((s,i)=>`<div class="step-dot ${i<S.formStep?'done':''} ${i===S.formStep?'active':''}"></div>`).join('')}</div>`;
h+=`<div class="card"><h2>Step ${S.formStep+1}: ${steps[S.formStep]}</h2>`;
if(S.formStep===0){
h+=`<div class="form-group"><label>Report Category</label><select id="f-cat">`;
h+=`<option value="">Select a category...</option>`;
h+=categories.map(c=>`<option ${f.category===c?'selected':''} value="${c}">${c}</option>`).join('');
h+=`</select></div>`;
h+=`<div class="anonymous-toggle"><div><strong style="font-size:14px">Anonymous Report</strong><div style="font-size:12px;color:var(--text-secondary)">Your identity will be protected</div></div><div class="toggle ${f.anonymous?'on':''}" onclick="window._toggleAnon()"></div></div>`;
}else if(S.formStep===1){
h+=`<div class="form-group"><label>Title</label><input id="f-title" value="${f.title}" placeholder="Brief summary of the issue"></div>`;
h+=`<div class="form-group"><label>Description</label><textarea id="f-desc" placeholder="Provide detailed information about the misconduct or irregularity...">${f.description}</textarea></div>`;
h+=`<div class="form-group"><label>Location / Department</label><input id="f-loc" value="${f.location}" placeholder="Where did this occur?"></div>`;
}else{
h+=`<div class="notice"><strong>&#9888; Review before submitting</strong>Once submitted, this report enters the AI triage system and cannot be edited.</div>`;
h+=`<div class="detail-row"><span class="label">Category</span><span class="value">${f.category}</span></div>`;
h+=`<div class="detail-row"><span class="label">Title</span><span class="value">${f.title}</span></div>`;
h+=`<div class="detail-row"><span class="label">Anonymous</span><span class="value">${f.anonymous?'Yes':'No'}</span></div>`;
h+=`<div style="margin-top:12px"><label style="font-size:13px;font-weight:600">Description</label><p style="font-size:13px;color:var(--text-secondary);margin-top:4px">${f.description}</p></div>`;
}
h+=`</div><div style="display:flex;gap:12px">`;
if(S.formStep>0) h+=`<button class="btn btn-outline" style="flex:1" onclick="window._formBack()">Back</button>`;
if(S.formStep<2) h+=`<button class="btn btn-secondary" style="flex:1" onclick="window._formNext()">Next</button>`;
else h+=`<button class="btn btn-primary" style="flex:1" onclick="window._submitReport()">&#128274; Submit Report</button>`;
h+=`</div></div>`;
return h;
}
function renderCases(){
const filtered=S.filter==='all'?S.cases:S.cases.filter(c=>c.status===S.filter);
let h=`<div class="screen active">`;
h+=`<div class="filter-bar">`;
['all','new','review','action','resolved'].forEach(f=>{
const label=f==='all'?'All':statusMap[f].label;
h+=`<button class="filter-chip ${S.filter===f?'active':''}" onclick="window._setFilter('${f}')">${label}</button>`;
});
h+=`</div>`;
if(filtered.length===0){
h+=`<div class="empty-state"><div class="icon">&#128193;</div><p>No cases found</p></div>`;
}else{
h+=`<div class="card" style="padding:0">`;
h+=filtered.map(cs=>{
const pClass=cs.severity>=4?'priority-high':cs.severity>=3?'priority-medium':'priority-low';
return `<div class="case-item ${pClass}" onclick="window._viewCase('${cs.id}')">
<div class="case-top"><span class="case-id">${cs.id}</span><span class="badge ${statusMap[cs.status].cls}">${statusMap[cs.status].label}</span></div>
<div class="case-title">${cs.title}</div>
<div class="case-cat">${cs.category} &middot; ${cs.date}</div>
<div class="severity-indicator">${[1,2,3,4,5].map(i=>`<div class="severity-dot ${i<=cs.severity?'active':''}"></div>`).join('')}</div>
</div>`;
}).join('');
h+=`</div>`;
}
h+=`</div>`;
return h;
}
function renderDetail(){
const cs=S.cases.find(c=>c.id===S.selectedCase);
if(!cs) return `<div class="screen active"><p>Case not found</p></div>`;
let h=`<div class="screen active">`;
h+=`<button class="btn btn-sm btn-outline" onclick="window._go('cases')">&larr; Back to Cases</button>`;
h+=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h2 style="margin:0">${cs.id}</h2><span class="badge ${statusMap[cs.status].cls}">${statusMap[cs.status].label}</span></div>`;
h+=`<h3 style="font-size:16px;color:var(--text);margin-bottom:16px">${cs.title}</h3>`;
h+=`<div class="detail-row"><span class="label">Category</span><span class="value">${cs.category}</span></div>`;
h+=`<div class="detail-row"><span class="label">Date Filed</span><span class="value">${cs.date}</span></div>`;
h+=`<div class="detail-row"><span class="label">Anonymous</span><span class="value">${cs.anonymous?'Yes':'No'}</span></div>`;
h+=`<div class="detail-row"><span class="label">Severity</span><span class="value">${cs.severity}/5</span></div>`;
h+=`</div>`;
h+=`<div class="card"><h2>&#129302; AI Analysis</h2><div class="ai-badge" style="margin-bottom:8px">AI Assessment</div><p>${cs.aiSummary}</p></div>`;
h+=`<div class="card"><h2>Description</h2><p>${cs.description}</p></div>`;
h+=`<div class="card"><h2>Timeline</h2>`;
h+=cs.timeline.map(t=>`<div class="timeline-item"><div class="time">${t.time}</div><div class="event">${t.event}</div></div>`).join('');
h+=`</div>`;
if(cs.status!=='resolved'){
h+=`<div style="display:flex;gap:12px">`;
h+=`<button class="btn btn-secondary btn-sm" style="flex:1" onclick="window._updateStatus('${cs.id}','review')">Review</button>`;
h+=`<button class="btn btn-primary btn-sm" style="flex:1" onclick="window._updateStatus('${cs.id}','resolved')">Resolve</button>`;
h+=`</div>`;
}
h+=`</div>`;
return h;
}
function renderLegal(){
let h=`<div class="screen active">`;
h+=`<div class="card"><h2>&#9878; Legal &amp; Compliance</h2><p>This platform operates under strict data protection and whistleblower protection frameworks.</p></div>`;
h+=`<div class="card"><div class="legal-section"><h3>Terms of Service</h3><p>Integrity Intake provides a secure channel for reporting corruption, fraud, and misconduct. Reports are processed using AI-assisted screening and routed to authorised reviewers.</p><ul><li>All reports are encrypted and access-controlled</li><li>AI screening assists human decision-makers but does not replace them</li><li>False or malicious reports may result in legal consequences</li><li>The platform does not guarantee investigation outcomes</li></ul></div></div>`;
h+=`<div class="card"><div class="legal-section"><h3>Privacy Notice</h3><p>We collect only the information necessary to process your report. Anonymous reports contain no identifying data.</p><ul><li>Data is encrypted at rest and in transit</li><li>Access is restricted to authorised personnel only</li><li>Reports are retained per applicable law and organisational policy</li><li>You may request deletion of non-anonymous reports</li></ul></div></div>`;
h+=`<div class="card" style="border:2px solid #fbbf24"><div class="legal-section"><h3>&#127481;&#127469; Thailand Notice</h3><div class="notice" style="margin-bottom:12px"><strong>Important: Thailand Operations</strong>In Thailand, Integrity Intake is available ONLY under signed agreements with specific organisations. It is not offered as an independent public reporting authority or as a substitute for the National Anti-Corruption Commission (NACC).</div><ul><li>Thai organisations adopt this system as their internal or partner reporting channel</li><li>Serious cases should still be reported directly to NACC or other competent bodies</li><li>The system complies with the Personal Data Protection Act (PDPA)</li><li>Whistleblower protections under Thai law are respected and documented</li></ul></div></div>`;
h+=`<div class="card"><h2>Contact</h2><p>For legal inquiries or data requests, contact the platform administrator through your organisation&rsquo;s designated channel.</p></div>`;
h+=`</div>`;
return h;
}
window._go=go;
window._viewCase=function(id){S.selectedCase=id;S.screen='detail';save();render()};
window._setFilter=function(f){S.filter=f;save();render()};
window._toggleAnon=function(){S.formData.anonymous=!S.formData.anonymous;save();render()};
window._formNext=function(){
if(S.formStep===0){
const cat=$('#f-cat');if(cat)S.formData.category=cat.value;
if(!S.formData.category){toast('Please select a category');return;}
}else if(S.formStep===1){
const t=$('#f-title'),d=$('#f-desc'),l=$('#f-loc');
if(t)S.formData.title=t.value;if(d)S.formData.description=d.value;if(l)S.formData.location=l.value;
if(!S.formData.title||!S.formData.description){toast('Please fill in title and description');return;}
}
S.formStep++;save();render();
};
window._formBack=function(){S.formStep--;save();render()};
window._submitReport=function(){
const f=S.formData;
const id='II-2024-'+(S.cases.length+1).toString().padStart(3,'0');
const now=new Date();
const dateStr=now.toISOString().split('T')[0];
const timeStr=now.toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
const severities={"Procurement Fraud":4,"Bribery":5,"Conflict of Interest":4,"Asset Misuse":2,"Financial Misconduct":3,"Abuse of Power":4,"Nepotism":3,"Other":2};
const sev=severities[f.category]||3;
const aiMsgs=["Pattern analysis complete. Cross-referencing with known cases.","AI screening applied. Categorised and queued for review.","Preliminary assessment: requires further documentation.","Flagged for priority review based on category risk profile."];
S.cases.unshift({id:id,title:f.title,category:f.category,status:'new',severity:sev,date:dateStr,anonymous:f.anonymous,description:f.description,aiSummary:aiMsgs[Math.floor(Math.random()*aiMsgs.length)],timeline:[{time:timeStr,event:'Report submitted'+(f.anonymous?' (anonymous)':'')},{time:timeStr,event:'AI screening: processing complete'}]});
S.formStep=0;S.formData={category:'',title:'',description:'',location:'',anonymous:true};
S.screen='dashboard';save();render();
toast('Report submitted successfully');
};
window._updateStatus=function(id,status){
const cs=S.cases.find(c=>c.id===id);
if(cs){
cs.status=status;
const now=new Date();
const timeStr=now.toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
cs.timeline.push({time:timeStr,event:status==='resolved'?'Case resolved':'Status updated to: '+statusMap[status].label});
save();render();
toast('Status updated');
}
};
render();
})();
