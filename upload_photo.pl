#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use File::Path qw(make_path);
use File::Basename;
use POSIX qw(strftime);

my $q = CGI->new;
print $q->header('text/plain');

# Get user
my $user = $q->param('user') || '';
unless ($user) {
    print "Missing user ID.\n";
    exit;
}

# Prepare folder
my $upload_dir = "user_uploads/$user";
make_path($upload_dir) unless -d $upload_dir;

# Get files
my @uploads = $q->upload('photo');
unless (@uploads) {
    print "No files uploaded.\n";
    exit;
}

foreach my $fh (@uploads) {
    next unless $fh;

    # Get original filename
    my $orig_name = $q->param($fh) || 'image.jpg';
    my ($name, $ext) = $orig_name =~ /^(.*?)(\.[^.]+)?$/;
    $ext ||= '.jpg';

    # Create unique name
    my $timestamp = strftime("%Y%m%d%H%M%S", localtime);
    my $unique_name = "${name}_$timestamp$ext";

    my $save_path = "$upload_dir/$unique_name";

    open(my $out, '>', $save_path) or die "Can't write to $save_path: $!";
    binmode($out);
    binmode($fh);

    my $buffer;
    while (read($fh, $buffer, 8192)) {
        print $out $buffer;
    }

    close($out);
}

print "Photo(s) uploaded successfully!";
