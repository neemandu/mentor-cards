export class DynamicDialogData {
    title: string;
	content: string;
    acceptButton: string;
    denyButton: string;


	constructor($title: string, $content: string, $acceptButton: string, $denyButton: string) {
		this.title = $title;
		this.content = $content;
		this.acceptButton = $acceptButton;
		this.denyButton = $denyButton;
	}

}
